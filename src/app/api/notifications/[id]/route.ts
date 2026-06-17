import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
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

    const notification = await Notification.findOne(query);
    if (!notification) {
      return NextResponse.json({ message: "Notification not found" }, { status: 404 });
    }
    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notification details", error: (error as Error).message },
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

    const notification = await Notification.findOneAndUpdate(
      query,
      {
        title: body.title,
        message: body.message,
        type: body.type,
        recipient: body.recipient,
        read: body.read,
        priority: body.priority,
        postedDate: body.postedDate ? new Date(body.postedDate) : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!notification) {
      return NextResponse.json({ message: "Notification not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update notification details", error: (error as Error).message },
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

    const notification = await Notification.findOneAndDelete(query);
    if (!notification) {
      return NextResponse.json({ message: "Notification not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Notification deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete notification", error: (error as Error).message },
      { status: 500 }
    );
  }
}
