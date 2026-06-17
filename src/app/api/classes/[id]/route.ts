import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Class from "@/models/Class";
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

    const cls = await Class.findOne(query).populate("classTeacher", "name employeeId");
    if (!cls) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
    }
    return NextResponse.json(cls);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch class", error: (error as Error).message },
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

    const cls = await Class.findOneAndUpdate(
      query,
      {
        name: body.name,
        section: body.section,
        classTeacher: body.classTeacher || undefined,
        capacity: body.capacity,
        subjects: body.subjects,
        status: body.status,
      },
      { new: true, runValidators: true },
    );

    if (!cls) {
      return NextResponse.json({ message: "Class not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(cls);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update class", error: (error as Error).message },
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

    const cls = await Class.findOneAndDelete(query);
    if (!cls) {
      return NextResponse.json({ message: "Class not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Class deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete class", error: (error as Error).message },
      { status: 500 },
    );
  }
}
