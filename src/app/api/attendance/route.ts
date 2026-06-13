import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get("type") || "Student";
    const date = searchParams.get("date") || "";
    const status = searchParams.get("status") || "";
    const search = searchParams.get("search") || "";
    const studentClass = searchParams.get("studentClass") || "";
    const department = searchParams.get("department") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const query: Record<string, unknown> = { entityType };
    if (status) query.status = status;
    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      query.date = { $gte: d, $lt: next };
    }

    let entityIds: unknown[] | null = null;

    if (entityType === "Student") {
      const studentQuery: Record<string, unknown> = {};
      let needsStudentQuery = false;

      if (search) {
        studentQuery.$or = [
          { name: { $regex: search, $options: "i" } },
          { rollNumber: { $regex: search, $options: "i" } },
        ];
        needsStudentQuery = true;
      }
      if (studentClass) {
        studentQuery.studentClass = studentClass;
        needsStudentQuery = true;
      }

      if (needsStudentQuery) {
        const students = await Student.find(studentQuery).select("_id");
        entityIds = students.map((s) => s._id);
      }
    } else if (entityType === "Teacher") {
      const teacherQuery: Record<string, unknown> = {};
      let needsTeacherQuery = false;

      if (search) {
        teacherQuery.$or = [
          { name: { $regex: search, $options: "i" } },
          { employeeId: { $regex: search, $options: "i" } },
        ];
        needsTeacherQuery = true;
      }
      if (department) {
        teacherQuery.department = department;
        needsTeacherQuery = true;
      }

      if (needsTeacherQuery) {
        const teachers = await Teacher.find(teacherQuery).select("_id");
        entityIds = teachers.map((t) => t._id);
      }
    }

    if (entityIds !== null) {
      query.entityId = { $in: entityIds };
    }

    const skip = (page - 1) * limit;
    const total = await Attendance.countDocuments(query);

    const attendance = await Attendance.find(query)
      .populate("entityId")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: attendance, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch attendance", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.entityId || !body.date || !body.status) {
      return NextResponse.json(
        { message: "Missing required fields: entityId, date, and status are required." },
        { status: 400 }
      );
    }

    const recordDate = new Date(body.date);
    if (isNaN(recordDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format." },
        { status: 400 }
      );
    }

    // Check if duplicate index would be violated
    const existing = await Attendance.findOne({
      entityId: body.entityId,
      date: recordDate,
      entityType: body.entityType ?? "Student",
    });

    if (existing) {
      return NextResponse.json(
        { message: "Attendance record already exists for this person on this date." },
        { status: 400 }
      );
    }

    const attendance = await Attendance.create({
      entityId: body.entityId,
      entityType: body.entityType ?? "Student",
      date: recordDate,
      status: body.status,
      remarks: body.remarks ?? "",
      markedBy: body.markedBy ?? "Admin",
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    const err = error as { code?: number; name?: string; message?: string };
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "Attendance record already exists for this person on this date." },
        { status: 400 }
      );
    }
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { message: err.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create attendance record", error: err.message || error },
      { status: 500 },
    );
  }
}
