import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Homework from "@/models/Homework";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const homework = await Homework.findById(id).populate("teacherId", "name employeeId");
    if (!homework) {
      return NextResponse.json(
        { message: "Homework assignment not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(homework);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch homework assignment", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const homework = await Homework.findByIdAndUpdate(
      id,
      {
        title: body.title,
        description: body.description,
        className: body.className,
        section: body.section,
        subject: body.subject,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        status: body.status,
        teacherId: body.teacherId || undefined,
        maxPoints: body.maxPoints,
      },
      { new: true, runValidators: true },
    );

    if (!homework) {
      return NextResponse.json(
        { message: "Homework assignment not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(homework);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update homework assignment", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const homework = await Homework.findByIdAndDelete(id);
    if (!homework) {
      return NextResponse.json(
        { message: "Homework assignment not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Homework assignment deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete homework assignment", error },
      { status: 500 },
    );
  }
}
