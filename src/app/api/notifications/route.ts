import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const recipient = searchParams.get("recipient") || "";
    const read = searchParams.get("read") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, any> = {};
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    } else {
      const filterSchoolId = searchParams.get("schoolId");
      if (filterSchoolId) query.schoolId = filterSchoolId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }
    if (type) query.type = type;
    if (recipient) query.recipient = recipient;
    if (read) query.read = read === "true";

    const skip = (page - 1) * limit;
    const total = await Notification.countDocuments(query);
    const notifications = await Notification.find(query)
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit);

    // Compute stats scoped to the active tenant/school
    const statsQuery: Record<string, any> = {};
    if (role !== "Super Admin") statsQuery.schoolId = schoolId;

    const totalNotifications = await Notification.countDocuments(statsQuery);
    const unreadNotifications = await Notification.countDocuments({ ...statsQuery, read: false });
    const importantNotifications = await Notification.countDocuments({ ...statsQuery, priority: "High" });

    const stats = {
      totalNotifications,
      unreadNotifications,
      importantNotifications,
    };

    return NextResponse.json({ data: notifications, total, stats, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notifications", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const body = await request.json();

    const targetSchoolId = role === "Super Admin" ? (body.schoolId || null) : schoolId;
    if (!targetSchoolId && role !== "Super Admin") {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    const notification = await Notification.create({
      schoolId: targetSchoolId,
      title: body.title,
      message: body.message,
      type: body.type || "Info",
      recipient: body.recipient || "All",
      read: body.read || false,
      priority: body.priority || "Normal",
      postedDate: body.postedDate ? new Date(body.postedDate) : new Date(),
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create notification", error: (error as Error).message },
      { status: 500 }
    );
  }
}
