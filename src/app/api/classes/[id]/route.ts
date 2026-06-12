import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Class from "@/models/Class";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const cls = await Class.findById(id).populate("classTeacher", "name employeeId");
    if (!cls) return NextResponse.json({ message: "Class not found" }, { status: 404 });
    return NextResponse.json(cls);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch class", error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const cls = await Class.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!cls) return NextResponse.json({ message: "Class not found" }, { status: 404 });
    return NextResponse.json(cls);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update class", error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    await Class.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete class", error }, { status: 500 });
  }
}
