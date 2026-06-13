import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Exam from "@/models/Exam";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const exam = await Exam.findById(id);
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }
    return NextResponse.json(exam);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch exam", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const exam = await Exam.findByIdAndUpdate(
      id,
      {
        name: body.name,
        subject: body.subject,
        className: body.className,
        section: body.section,
        date: body.date ? new Date(body.date) : undefined,
        duration: body.duration,
        totalMarks: body.totalMarks,
        passingMarks: body.passingMarks,
        status: body.status,
        description: body.description,
      },
      { new: true, runValidators: true },
    );

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update exam", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const exam = await Exam.findByIdAndDelete(id);
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Exam deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete exam", error },
      { status: 500 },
    );
  }
}
