import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const studentClass = searchParams.get("class") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (studentClass) query.studentClass = studentClass;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: students, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch students", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const student = await Student.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      rollNumber: body.rollNumber,
      studentClass: body.studentClass,
      section: body.section,
      gender: body.gender,
      dateOfBirth: body.dateOfBirth,
      admissionDate: body.admissionDate,
      address: body.address,
      parentName: body.parentName,
      parentPhone: body.parentPhone,
      attendance: body.attendance ?? 100,
      status: body.status ?? "Active",
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create student", error },
      { status: 500 },
    );
  }
}
