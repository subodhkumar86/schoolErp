import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Teacher from "@/models/Teacher";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch teacher",
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

    const teacher = await Teacher.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update teacher",
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

    await Teacher.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete teacher",
        error,
      },
      { status: 500 },
    );
  }
}
