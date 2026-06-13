import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const notification = await Notification.findById(id);
    if (!notification) {
      return NextResponse.json({ message: "Notification not found" }, { status: 404 });
    }
    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notification details", error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const notification = await Notification.findByIdAndUpdate(
      id,
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
      return NextResponse.json({ message: "Notification not found" }, { status: 404 });
    }

    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update notification details", error },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return NextResponse.json({ message: "Notification not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Notification deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete notification", error },
      { status: 500 }
    );
  }
}
