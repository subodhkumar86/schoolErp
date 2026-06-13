import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Result from "@/models/Result";
import Exam from "@/models/Exam";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const result = await Result.findById(id)
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
      { message: "Failed to fetch result record", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const result = await Result.findById(id);
    if (!result) {
      return NextResponse.json(
        { message: "Result record not found." },
        { status: 404 },
      );
    }

    if (body.marksObtained !== undefined) {
      const exam = await Exam.findById(result.examId);
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
      { message: "Failed to update result record", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const result = await Result.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { message: "Result record not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Result record deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete result record", error },
      { status: 500 },
    );
  }
}
