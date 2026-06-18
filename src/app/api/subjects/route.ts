import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subject from "@/models/Subject";
import { getSession } from "@/lib/session";
import { logActivity } from "@/lib/logger";

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
    const type = searchParams.get("type") || "";
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
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    if (type) {
      query.type = type;
    }

    const skip = (page - 1) * limit;
    const total = await Subject.countDocuments(query);
    const subjects = await Subject.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: subjects, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch subjects", error: (error as Error).message },
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
    if (!targetSchoolId) {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    if (!body.name || !body.code) {
      return NextResponse.json({ message: "Name and Code are required" }, { status: 400 });
    }

    // Check duplicate code for this school
    const existing = await Subject.findOne({ schoolId: targetSchoolId, code: body.code.trim().toUpperCase() });
    if (existing) {
      return NextResponse.json({ message: `Subject code '${body.code}' already exists for this school.` }, { status: 400 });
    }

    const subject = await Subject.create({
      schoolId: targetSchoolId,
      name: body.name.trim(),
      code: body.code.trim().toUpperCase(),
      type: body.type || "Theory",
      description: body.description || "",
    });

    if (session.user) {
      await logActivity(
        targetSchoolId.toString(),
        session.user.id,
        "Subject Created",
        `Subject '${subject.name}' (${subject.code}) was created by ${session.user.username}.`
      );
    }

    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create subject", error: (error as Error).message },
      { status: 500 }
    );
  }
}
