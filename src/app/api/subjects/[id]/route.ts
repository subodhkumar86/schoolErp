import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subject from "@/models/Subject";
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

    const subject = await Subject.findOne(query);
    if (!subject) {
      return NextResponse.json({ message: "Subject not found" }, { status: 404 });
    }
    return NextResponse.json(subject);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch subject", error: (error as Error).message },
      { status: 500 }
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

    const subject = await Subject.findOne(query);
    if (!subject) {
      return NextResponse.json({ message: "Subject not found or access denied" }, { status: 404 });
    }

    if (!body.name || !body.code) {
      return NextResponse.json({ message: "Name and Code are required" }, { status: 400 });
    }

    // Check duplicate code if changed
    const newCode = body.code.trim().toUpperCase();
    if (newCode !== subject.code) {
      const existing = await Subject.findOne({
        schoolId: subject.schoolId,
        code: newCode,
        _id: { $ne: id },
      });
      if (existing) {
        return NextResponse.json({ message: `Subject code '${body.code}' already exists for this school.` }, { status: 400 });
      }
    }

    const updated = await Subject.findOneAndUpdate(
      query,
      {
        name: body.name.trim(),
        code: newCode,
        type: body.type || "Theory",
        description: body.description || "",
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update subject", error: (error as Error).message },
      { status: 500 }
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

    const deleted = await Subject.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ message: "Subject not found or access denied" }, { status: 404 });
    }

    return NextResponse.json({ message: "Subject deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete subject", error: (error as Error).message },
      { status: 500 }
    );
  }
}
