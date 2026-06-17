import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Timetable from "@/models/Timetable";
import Class from "@/models/Class";
import Teacher from "@/models/Teacher";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const classId = searchParams.get("classId") || "";
    const teacherId = searchParams.get("teacherId") || "";
    const dayOfWeek = searchParams.get("dayOfWeek") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, any> = {};

    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    } else {
      const filterSchoolId = searchParams.get("schoolId");
      if (filterSchoolId) query.schoolId = filterSchoolId;
    }

    if (classId) query.classId = classId;
    if (teacherId) query.teacherId = teacherId;
    if (dayOfWeek) query.dayOfWeek = dayOfWeek;

    // If text search, find matching classes or teachers first, or filter subject
    if (search) {
      const subQuery: Record<string, any> = {};
      if (role !== "Super Admin") subQuery.schoolId = schoolId;

      const [matchedClasses, matchedTeachers] = await Promise.all([
        Class.find({ ...subQuery, name: { $regex: search, $options: "i" } }).select("_id"),
        Teacher.find({ ...subQuery, name: { $regex: search, $options: "i" } }).select("_id"),
      ]);

      const classIds = matchedClasses.map((c) => c._id);
      const teacherIds = matchedTeachers.map((t) => t._id);

      query.$or = [
        { subject: { $regex: search, $options: "i" } },
        { classroom: { $regex: search, $options: "i" } },
        { classId: { $in: classIds } },
        { teacherId: { $in: teacherIds } },
      ];
    }

    const skip = (page - 1) * limit;
    const total = await Timetable.countDocuments(query);
    const slots = await Timetable.find(query)
      .populate("classId", "name section")
      .populate("teacherId", "name")
      .sort({ dayOfWeek: 1, startTime: 1 })
      .skip(skip)
      .limit(limit);

    // Compute stats
    const statsQuery: Record<string, any> = {};
    if (role !== "Super Admin") statsQuery.schoolId = schoolId;

    const [totalSlots, distinctClasses, distinctTeachers] = await Promise.all([
      Timetable.countDocuments(statsQuery),
      Timetable.distinct("classId", statsQuery),
      Timetable.distinct("teacherId", statsQuery),
    ]);

    const stats = {
      totalSlots,
      classesScheduled: distinctClasses.length,
      teachersAssigned: distinctTeachers.length,
    };

    return NextResponse.json({ data: slots, total, stats, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch timetable slots", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const body = await request.json();

    const targetSchoolId = role === "Super Admin" ? (body.schoolId || null) : schoolId;
    if (!targetSchoolId && role !== "Super Admin") {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    // Verify references exist
    const [classExists, teacherExists] = await Promise.all([
      Class.findOne({ _id: body.classId, schoolId: targetSchoolId }),
      Teacher.findOne({ _id: body.teacherId, schoolId: targetSchoolId }),
    ]);

    if (!classExists) {
      return NextResponse.json({ message: "Selected Class does not exist in your school" }, { status: 400 });
    }
    if (!teacherExists) {
      return NextResponse.json({ message: "Selected Teacher does not exist in your school" }, { status: 400 });
    }

    const slot = await Timetable.create({
      schoolId: targetSchoolId,
      classId: body.classId,
      subject: body.subject,
      teacherId: body.teacherId,
      dayOfWeek: body.dayOfWeek,
      startTime: body.startTime,
      endTime: body.endTime,
      classroom: body.classroom ?? "",
    });

    return NextResponse.json(slot, { status: 201 });
  } catch (error) {
    const err = error as { code?: number };
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "Schedule conflict: This class is already scheduled for this day and time" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create timetable slot", error: (error as Error).message },
      { status: 500 }
    );
  }
}
