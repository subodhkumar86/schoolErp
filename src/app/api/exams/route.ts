import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Exam from "@/models/Exam";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const className = searchParams.get("class") || "";
    const status = searchParams.get("status") || "";

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }
    if (className) query.className = className;
    if (status) query.status = status;

    const exams = await Exam.find(query).sort({ date: -1 });
    const total = await Exam.countDocuments(query);

    return NextResponse.json({ data: exams, total });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch exams", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const exam = await Exam.create(body);
    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create exam", error },
      { status: 500 },
    );
  }
}
