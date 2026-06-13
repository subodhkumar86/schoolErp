import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const audience = searchParams.get("audience") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { createdBy: { $regex: search, $options: "i" } },
      ];
    }

    if (audience) {
      query.audience = audience;
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const total = await Notice.countDocuments(query);
    const notices = await Notice.find(query)
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit);

    // Compute stats
    const allNotices = await Notice.find({});
    let activeNotices = 0;
    let archivedNotices = 0;

    allNotices.forEach((n) => {
      if (n.status === "Active") {
        activeNotices++;
      } else if (n.status === "Archived") {
        archivedNotices++;
      }
    });

    const stats = {
      totalNotices: allNotices.length,
      activeNotices,
      archivedNotices,
    };

    return NextResponse.json({ data: notices, total, stats, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notices", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const notice = await Notice.create({
      ...body,
      postedDate: body.postedDate ? new Date(body.postedDate) : undefined,
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
    });

    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to publish notice", error },
      { status: 500 },
    );
  }
}
