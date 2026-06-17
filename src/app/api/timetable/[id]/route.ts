import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Timetable from "@/models/Timetable";
import Class from "@/models/Class";
import Teacher from "@/models/Teacher";
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

    const slot = await Timetable.findOne(query)
      .populate("classId", "name section")
      .populate("teacherId", "name");
    
    if (!slot) {
      return NextResponse.json({ message: "Timetable slot not found" }, { status: 404 });
    }
    return NextResponse.json(slot);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch slot details", error: (error as Error).message },
      { status: 500 }
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

    // Verify reference access
    const targetSchoolId = role === "Super Admin" ? (body.schoolId || null) : schoolId;

    if (body.classId) {
      const classExists = await Class.findOne({ _id: body.classId, schoolId: targetSchoolId });
      if (!classExists) {
        return NextResponse.json({ message: "Selected Class does not exist in your school" }, { status: 400 });
      }
    }

    if (body.teacherId) {
      const teacherExists = await Teacher.findOne({ _id: body.teacherId, schoolId: targetSchoolId });
      if (!teacherExists) {
        return NextResponse.json({ message: "Selected Teacher does not exist in your school" }, { status: 400 });
      }
    }

    const slot = await Timetable.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true,
    });

    if (!slot) {
      return NextResponse.json({ message: "Timetable slot not found or access denied" }, { status: 404 });
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
      { message: "Failed to update slot details", error: (error as Error).message },
      { status: 500 }
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

    const slot = await Timetable.findOneAndDelete(query);
    if (!slot) {
      return NextResponse.json({ message: "Timetable slot not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Timetable slot deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete timetable slot", error: (error as Error).message },
      { status: 500 }
    );
  }
}
