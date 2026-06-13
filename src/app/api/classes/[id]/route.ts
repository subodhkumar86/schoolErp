import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Class from "@/models/Class";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const cls = await Class.findById(id).populate("classTeacher", "name employeeId");
    if (!cls) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
    }
    return NextResponse.json(cls);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch class", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const cls = await Class.findByIdAndUpdate(
      id,
      {
        name: body.name,
        section: body.section,
        classTeacher: body.classTeacher || undefined,
        capacity: body.capacity,
        subjects: body.subjects,
        status: body.status,
      },
      { new: true, runValidators: true },
    );

    if (!cls) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
    }

    return NextResponse.json(cls);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update class", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const cls = await Class.findByIdAndDelete(id);
    if (!cls) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Class deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete class", error },
      { status: 500 },
    );
  }
}
