import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Timetable from "@/models/Timetable";
import Class from "@/models/Class";
import Teacher from "@/models/Teacher";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const slot = await Timetable.findById(id)
      .populate("classId", "name section")
      .populate("teacherId", "name");
    
    if (!slot) {
      return NextResponse.json({ message: "Timetable slot not found" }, { status: 404 });
    }
    return NextResponse.json(slot);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch slot details", error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // Verify references if they are updated
    if (body.classId) {
      const classExists = await Class.findById(body.classId);
      if (!classExists) {
        return NextResponse.json({ message: "Selected Class does not exist" }, { status: 400 });
      }
    }

    if (body.teacherId) {
      const teacherExists = await Teacher.findById(body.teacherId);
      if (!teacherExists) {
        return NextResponse.json({ message: "Selected Teacher does not exist" }, { status: 400 });
      }
    }

    const slot = await Timetable.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!slot) {
      return NextResponse.json({ message: "Timetable slot not found" }, { status: 404 });
    }

    return NextResponse.json(slot);
  } catch (error) {
    const err = error as { code?: number };
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "Schedule conflict: This class is already scheduled for this day and time" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to update slot details", error },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const slot = await Timetable.findByIdAndDelete(id);
    if (!slot) {
      return NextResponse.json({ message: "Timetable slot not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Timetable slot deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete timetable slot", error },
      { status: 500 }
    );
  }
}
