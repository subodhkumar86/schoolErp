import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Result from "@/models/Result";
import Exam from "@/models/Exam";
import { getSession } from "@/lib/session";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const result = await Result.findOne(query)
      .populate("studentId", "name rollNumber studentClass section")
      .populate("examId", "name subject totalMarks passingMarks date");

    if (!result) {
      return NextResponse.json(
        { message: "Result record not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch result record", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const result = await Result.findOne(query);
    if (!result) {
      return NextResponse.json(
        { message: "Result record not found or access denied" },
        { status: 404 },
      );
    }

    if (body.marksObtained !== undefined) {
      // Validate exam exists and check max marks
      const exam = await Exam.findOne({ _id: result.examId, schoolId: result.schoolId });
      if (exam && body.marksObtained > exam.totalMarks) {
        return NextResponse.json(
          { message: `Marks obtained cannot exceed total exam marks (${exam.totalMarks}).` },
          { status: 400 },
        );
      }
      result.marksObtained = body.marksObtained;
    }

    if (body.grade !== undefined) {
      result.grade = body.grade;
    }
    if (body.remarks !== undefined) {
      result.remarks = body.remarks;
    }

    await result.save();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update result record", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const result = await Result.findOneAndDelete(query);
    if (!result) {
      return NextResponse.json(
        { message: "Result record not found or access denied" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Result record deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete result record", error: (error as Error).message },
      { status: 500 },
    );
  }
}
