import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Exam from "@/models/Exam";
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
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const className = searchParams.get("class") || "";
    const status = searchParams.get("status") || "";

    const query: Record<string, any> = {};
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    } else {
      const filterSchoolId = searchParams.get("schoolId");
      if (filterSchoolId) query.schoolId = filterSchoolId;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }
    if (className) query.className = className;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Exam.countDocuments(query);

    const exams = await Exam.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: exams, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch exams", error: (error as Error).message },
      { status: 500 },
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

    const exam = await Exam.create({
      schoolId: targetSchoolId,
      name: body.name,
      subject: body.subject,
      className: body.className,
      section: body.section,
      date: body.date,
      duration: body.duration,
      totalMarks: body.totalMarks,
      passingMarks: body.passingMarks,
      status: body.status,
      description: body.description,
    });

    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create exam", error: (error as Error).message },
      { status: 500 },
    );
  }
}
