import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Class from "@/models/Class";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { section: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;

    const classes = await Class.find(query)
      .populate("classTeacher", "name employeeId")
      .sort({ name: 1, section: 1 });

    const total = await Class.countDocuments(query);

    return NextResponse.json({ data: classes, total });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch classes", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const cls = await Class.create({
      name: body.name,
      section: body.section,
      classTeacher: body.classTeacher || undefined,
      capacity: body.capacity ?? 40,
      subjects: body.subjects ?? [],
      status: body.status ?? "Active",
    });

    return NextResponse.json(cls, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create class", error },
      { status: 500 },
    );
  }
}
