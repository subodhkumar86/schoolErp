import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Exam from "@/models/Exam";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const exam = await Exam.findById(id);
    if (!exam) return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    return NextResponse.json(exam);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch exam", error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const exam = await Exam.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!exam) return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    return NextResponse.json(exam);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update exam", error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    await Exam.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete exam", error }, { status: 500 });
  }
}
