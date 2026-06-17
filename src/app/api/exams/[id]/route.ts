import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Exam from "@/models/Exam";
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

    const exam = await Exam.findOne(query);
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }
    return NextResponse.json(exam);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch exam", error: (error as Error).message },
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

    const exam = await Exam.findOneAndUpdate(
      query,
      {
        name: body.name,
        subject: body.subject,
        className: body.className,
        section: body.section,
        date: body.date ? new Date(body.date) : undefined,
        duration: body.duration,
        totalMarks: body.totalMarks,
        passingMarks: body.passingMarks,
        status: body.status,
        description: body.description,
      },
      { new: true, runValidators: true },
    );

    if (!exam) {
      return NextResponse.json({ message: "Exam not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update exam", error: (error as Error).message },
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

    const exam = await Exam.findOneAndDelete(query);
    if (!exam) {
      return NextResponse.json({ message: "Exam not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Exam deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete exam", error: (error as Error).message },
      { status: 500 },
    );
  }
}
