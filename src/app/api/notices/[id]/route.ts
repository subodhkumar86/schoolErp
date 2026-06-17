import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";
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

    const notice = await Notice.findOne(query);
    if (!notice) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }
    return NextResponse.json(notice);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notice details", error: (error as Error).message },
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

    const notice = await Notice.findOneAndUpdate(
      query,
      {
        title: body.title,
        content: body.content,
        audience: body.audience,
        postedDate: body.postedDate ? new Date(body.postedDate) : undefined,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
        status: body.status,
        createdBy: body.createdBy,
      },
      { new: true, runValidators: true },
    );

    if (!notice) {
      return NextResponse.json({ message: "Notice not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(notice);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update notice details", error: (error as Error).message },
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

    const notice = await Notice.findOneAndDelete(query);
    if (!notice) {
      return NextResponse.json({ message: "Notice not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Notice deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete notice", error: (error as Error).message },
      { status: 500 },
    );
  }
}
