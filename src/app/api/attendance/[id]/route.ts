import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const record = await Attendance.findById(id).populate("entityId");
    if (!record) {
      return NextResponse.json(
        { message: "Attendance record not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch attendance record", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const record = await Attendance.findByIdAndUpdate(
      id,
      {
        status: body.status,
        remarks: body.remarks,
        markedBy: body.markedBy,
        date: body.date ? new Date(body.date) : undefined,
      },
      { new: true, runValidators: true },
    );

    if (!record) {
      return NextResponse.json(
        { message: "Attendance record not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update attendance record", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const record = await Attendance.findByIdAndDelete(id);
    if (!record) {
      return NextResponse.json(
        { message: "Attendance record not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Attendance record deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete attendance record", error },
      { status: 500 },
    );
  }
}
