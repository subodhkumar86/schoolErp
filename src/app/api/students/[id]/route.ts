import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import { getSession } from "@/lib/session";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const student = await Student.findOne(query);
    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch student", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const student = await Student.findOneAndUpdate(
      query,
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
        attendance: body.attendance,
        documents: body.documents,
      },
      { new: true, runValidators: true },
    );

    if (!student) {
      return NextResponse.json({ message: "Student not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update student", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const student = await Student.findOneAndDelete(query);
    if (!student) {
      return NextResponse.json({ message: "Student not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete student", error: (error as Error).message },
      { status: 500 },
    );
  }
}
