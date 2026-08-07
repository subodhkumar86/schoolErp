import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
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

    const record = await Attendance.findOne(query).populate("entityId");
    if (!record) {
      return NextResponse.json(
        { message: "Attendance record not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch attendance record", error: (error as Error).message },
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

    const record = await Attendance.findOneAndUpdate(
      query,
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
        { message: "Attendance record not found or access denied" },
        { status: 404 },
      );
    }

    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update attendance record", error: (error as Error).message },
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

    const record = await Attendance.findOneAndDelete(query);
    if (!record) {
      return NextResponse.json(
        { message: "Attendance record not found or access denied" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete attendance record", error: (error as Error).message },
      { status: 500 },
    );
  }
}

