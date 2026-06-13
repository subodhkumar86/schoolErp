import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Homework from "@/models/Homework";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const className = searchParams.get("class") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }
    if (className) query.className = className;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Homework.countDocuments(query);

    const homeworks = await Homework.find(query)
      .populate("teacherId", "name employeeId")
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ data: homeworks, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch homework assignments", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.title || !body.description || !body.className || !body.subject || !body.dueDate) {
      return NextResponse.json(
        { message: "Missing required fields: title, description, className, subject, and dueDate are required." },
        { status: 400 },
      );
    }

    const homework = await Homework.create({
      title: body.title,
      description: body.description,
      className: body.className,
      section: body.section || "",
      subject: body.subject,
      dueDate: new Date(body.dueDate),
      status: body.status || "Active",
      teacherId: body.teacherId || undefined,
      maxPoints: body.maxPoints ?? 100,
    });

    return NextResponse.json(homework, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create homework assignment", error },
      { status: 500 },
    );
  }
}
