import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Homework from "@/models/Homework";
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
    const className = searchParams.get("class") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, any> = {};
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    } else {
      const filterSchoolId = searchParams.get("schoolId");
      if (filterSchoolId) query.schoolId = filterSchoolId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }
    if (className) query.className = className;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Homework.countDocuments(query);

    const homeworks = await Homework.find(query)
      .populate("teacherId", "name employeeId")
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: homeworks, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch homework assignments", error: (error as Error).message },
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

    if (!body.title || !body.description || !body.className || !body.subject || !body.dueDate) {
      return NextResponse.json(
        { message: "Missing required fields: title, description, className, subject, and dueDate are required." },
        { status: 400 },
      );
    }

    const targetSchoolId = role === "Super Admin" ? (body.schoolId || null) : schoolId;
    if (!targetSchoolId && role !== "Super Admin") {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    const homework = await Homework.create({
      schoolId: targetSchoolId,
      title: body.title,
      description: body.description,
      className: body.className,
      section: body.section || "",
      subject: body.subject,
      dueDate: new Date(body.dueDate),
      status: body.status || "Active",
      teacherId: body.teacherId || undefined,
      maxPoints: body.maxPoints ?? 100,
    });

    return NextResponse.json(homework, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create homework assignment", error: (error as Error).message },
      { status: 500 },
    );
  }
}
