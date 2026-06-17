import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Class from "@/models/Class";
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
        { section: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Class.countDocuments(query);

    const classes = await Class.find(query)
      .populate("classTeacher", "name employeeId")
      .sort({ name: 1, section: 1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: classes, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch classes", error: (error as Error).message },
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

    const cls = await Class.create({
      schoolId: targetSchoolId,
      name: body.name,
      section: body.section,
      classTeacher: body.classTeacher || undefined,
      capacity: body.capacity ?? 40,
      subjects: body.subjects ?? [],
      status: body.status ?? "Active",
    });

    return NextResponse.json(cls, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create class", error: (error as Error).message },
      { status: 500 },
    );
  }
}
