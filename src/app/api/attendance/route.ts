import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get("type") || "Student";
    const date = searchParams.get("date") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const query: Record<string, unknown> = { entityType };
    if (status) query.status = status;
    if (date) {
      const d = new Date(date);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      query.date = { $gte: d, $lt: next };
    }

    const skip = (page - 1) * limit;
    const total = await Attendance.countDocuments(query);

    const attendance = await Attendance.find(query)
      .populate("entityId")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: attendance, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch attendance", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const attendance = await Attendance.create({
      entityId: body.entityId,
      entityType: body.entityType ?? "Student",
      date: new Date(body.date),
      status: body.status,
      remarks: body.remarks ?? "",
      markedBy: body.markedBy ?? "Admin",
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create attendance record", error },
      { status: 500 },
    );
  }
}
