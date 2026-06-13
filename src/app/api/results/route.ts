import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Result from "@/models/Result";
import Student from "@/models/Student";
import Exam from "@/models/Exam";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const className = searchParams.get("class") || "";
    const examId = searchParams.get("examId") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    let studentIds: unknown[] | null = null;
    let needsStudentQuery = false;
    const studentQuery: Record<string, unknown> = {};

    if (search) {
      studentQuery.name = { $regex: search, $options: "i" };
      needsStudentQuery = true;
    }
    if (className) {
      studentQuery.studentClass = className;
      needsStudentQuery = true;
    }

    if (needsStudentQuery) {
      const students = await Student.find(studentQuery).select("_id");
      studentIds = students.map((s) => s._id);
    }

    const query: Record<string, unknown> = {};
    if (studentIds !== null) {
      query.studentId = { $in: studentIds };
    }
    if (examId) {
      query.examId = examId;
    }

    const skip = (page - 1) * limit;
    const total = await Result.countDocuments(query);

    const results = await Result.find(query)
      .populate("studentId", "name rollNumber studentClass section")
      .populate("examId", "name subject totalMarks passingMarks date")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: results, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch results", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.studentId || !body.examId || body.marksObtained === undefined) {
      return NextResponse.json(
        { message: "Missing required fields: studentId, examId, and marksObtained are required." },
        { status: 400 },
      );
    }

    // Validate exam exists and check max marks
    const exam = await Exam.findById(body.examId);
    if (!exam) {
      return NextResponse.json(
        { message: "Exam not found." },
        { status: 404 },
      );
    }

    if (body.marksObtained > exam.totalMarks) {
      return NextResponse.json(
        { message: `Marks obtained cannot exceed total exam marks (${exam.totalMarks}).` },
        { status: 400 },
      );
    }

    // Check duplicate
    const existing = await Result.findOne({
      studentId: body.studentId,
      examId: body.examId,
    });

    if (existing) {
      return NextResponse.json(
        { message: "A result record already exists for this student on this exam." },
        { status: 400 },
      );
    }

    // Determine Grade based on score percentage if not provided
    let grade = body.grade;
    if (!grade) {
      const percentage = (body.marksObtained / exam.totalMarks) * 100;
      if (percentage >= 90) grade = "A+";
      else if (percentage >= 80) grade = "A";
      else if (percentage >= 70) grade = "B";
      else if (percentage >= 60) grade = "C";
      else if (percentage >= 50) grade = "D";
      else if (percentage >= exam.passingMarks) grade = "E";
      else grade = "F";
    }

    const result = await Result.create({
      studentId: body.studentId,
      examId: body.examId,
      marksObtained: body.marksObtained,
      grade,
      remarks: body.remarks || "",
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const err = error as { code?: number; message?: string };
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "A result record already exists for this student on this exam." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Failed to create result record", error: err.message || error },
      { status: 500 },
    );
  }
}
