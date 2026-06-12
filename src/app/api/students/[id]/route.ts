import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const student = await Student.findById(id);

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch student",
        error,
      },
      { status: 500 },
    );
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

    const student = await Student.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update student",
        error,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete student",
        error,
      },
      { status: 500 },
    );
  }
}
