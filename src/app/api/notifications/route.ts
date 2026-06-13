import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const recipient = searchParams.get("recipient") || "";
    const read = searchParams.get("read") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    if (type) {
      query.type = type;
    }

    if (recipient) {
      query.recipient = recipient;
    }

    if (read) {
      query.read = read === "true";
    }

    const skip = (page - 1) * limit;
    const total = await Notification.countDocuments(query);
    const notifications = await Notification.find(query)
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit);

    // Compute stats
    const totalNotifications = await Notification.countDocuments({});
    const unreadNotifications = await Notification.countDocuments({ read: false });
    const importantNotifications = await Notification.countDocuments({ priority: "High" });

    const stats = {
      totalNotifications,
      unreadNotifications,
      importantNotifications,
    };

    return NextResponse.json({ data: notifications, total, stats, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notifications", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const notification = await Notification.create({
      ...body,
      postedDate: body.postedDate ? new Date(body.postedDate) : undefined,
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create notification", error },
      { status: 500 }
    );
  }
}
