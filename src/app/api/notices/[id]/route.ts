import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const notice = await Notice.findById(id);
    if (!notice) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }
    return NextResponse.json(notice);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notice details", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const notice = await Notice.findByIdAndUpdate(
      id,
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
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json(notice);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update notice details", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) {
      return NextResponse.json({ message: "Notice not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Notice deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete notice", error },
      { status: 500 },
    );
  }
}
