import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import User from "@/models/User";
import { getSession, checkSubscriptionLimit } from "@/lib/session";
import { hashPassword } from "@/lib/auth";

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
    const department = searchParams.get("department") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

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
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
      ];
    }

    if (department) query.department = department;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Teacher.countDocuments(query);
    const teachers = await Teacher.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: teachers, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch teachers", error: (error as Error).message },
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

    // Enforce subscription teacher limit
    if (role !== "Super Admin" && schoolId) {
      const limitCheck = await checkSubscriptionLimit(schoolId, "Teacher");
      if (!limitCheck.allowed) {
        return NextResponse.json({ message: limitCheck.message }, { status: 403 });
      }
    }

    await connectDB();
    const body = await request.json();

    const targetSchoolId = role === "Super Admin" ? (body.schoolId || null) : schoolId;
    if (!targetSchoolId && role !== "Super Admin") {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    const teacher = await Teacher.create({
      schoolId: targetSchoolId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      employeeId: body.employeeId,
      department: body.department,
      qualification: body.qualification,
      experience: body.experience ?? 0,
      salary: body.salary ?? 0,
      joiningDate: body.joiningDate,
      address: body.address,
      subjects: body.subjects ?? [],
      status: body.status ?? "Active",
    });

    // Auto-create login credentials for the teacher
    const defaultPassword = await hashPassword("password123");
    const baseUsername = body.email ? body.email.trim().toLowerCase().split("@")[0] : body.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
    let username = baseUsername || "teacher";
    let exists = await User.findOne({ username });
    let counter = 1;
    while (exists) {
      username = `${baseUsername}${counter}`;
      exists = await User.findOne({ username });
      counter++;
    }

    const emailVal = body.email ? body.email.trim().toLowerCase() : `${username}@example.com`;

    const existingUser = await User.findOne({ email: emailVal });
    if (!existingUser) {
      await User.create({
        username,
        email: emailVal,
        password: defaultPassword,
        role: "Teacher",
        schoolId: targetSchoolId,
        entityId: teacher._id,
        entityModel: "Teacher",
        status: "Active",
      });
    }

    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create teacher", error: (error as Error).message },
      { status: 500 },
    );
  }
}
