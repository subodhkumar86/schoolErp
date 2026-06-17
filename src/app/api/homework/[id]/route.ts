import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Homework from "@/models/Homework";
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

    const homework = await Homework.findOne(query).populate("teacherId", "name employeeId");
    if (!homework) {
      return NextResponse.json(
        { message: "Homework assignment not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(homework);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch homework assignment", error: (error as Error).message },
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

    const homework = await Homework.findOneAndUpdate(
      query,
      {
        title: body.title,
        description: body.description,
        className: body.className,
        section: body.section,
        subject: body.subject,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        status: body.status,
        teacherId: body.teacherId || undefined,
        maxPoints: body.maxPoints,
      },
      { new: true, runValidators: true },
    );

    if (!homework) {
      return NextResponse.json(
        { message: "Homework assignment not found or access denied" },
        { status: 404 },
      );
    }

    return NextResponse.json(homework);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update homework assignment", error: (error as Error).message },
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

    const homework = await Homework.findOneAndDelete(query);
    if (!homework) {
      return NextResponse.json(
        { message: "Homework assignment not found or access denied" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Homework assignment deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete homework assignment", error: (error as Error).message },
      { status: 500 },
    );
  }
}
