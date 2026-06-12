import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Fee from "@/models/Fee";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const fee = await Fee.findById(id).populate("studentId", "name rollNumber studentClass");
    if (!fee) return NextResponse.json({ message: "Fee not found" }, { status: 404 });
    return NextResponse.json(fee);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch fee", error }, { status: 500 });
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
    const fee = await Fee.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!fee) return NextResponse.json({ message: "Fee not found" }, { status: 404 });
    return NextResponse.json(fee);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update fee", error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    await Fee.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete fee", error }, { status: 500 });
  }
}
