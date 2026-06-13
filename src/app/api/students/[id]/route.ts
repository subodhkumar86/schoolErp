import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch student", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const student = await Student.findByIdAndUpdate(
      id,
      {
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
        status: body.status,
      },
      { new: true, runValidators: true },
    );

    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update student", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete student", error },
      { status: 500 },
    );
  }
}
