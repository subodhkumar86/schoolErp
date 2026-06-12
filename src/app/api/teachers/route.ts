import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Teacher from "@/models/Teacher";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const department = searchParams.get("department") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const query: Record<string, unknown> = {};

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
      { message: "Failed to fetch teachers", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const teacher = await Teacher.create({
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

    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create teacher", error },
      { status: 500 },
    );
  }
}
