import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notice from "@/models/Notice";
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
    const audience = searchParams.get("audience") || "";
    const status = searchParams.get("status") || "";
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
        { content: { $regex: search, $options: "i" } },
        { createdBy: { $regex: search, $options: "i" } },
      ];
    }

    if (audience) query.audience = audience;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Notice.countDocuments(query);
    const notices = await Notice.find(query)
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit);

    // Compute stats scoped to the active tenant/school
    const statsQuery: Record<string, any> = {};
    if (role !== "Super Admin") statsQuery.schoolId = schoolId;

    const allNotices = await Notice.find(statsQuery);
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
      { message: "Failed to fetch notices", error: (error as Error).message },
      { status: 500 },
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
    if (!targetSchoolId) {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    const notice = await Notice.create({
      schoolId: targetSchoolId,
      title: body.title,
      content: body.content,
      audience: body.audience || "All",
      postedDate: body.postedDate ? new Date(body.postedDate) : new Date(),
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
      status: body.status || "Active",
      createdBy: body.createdBy || "Administration",
    });

    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to publish notice", error: (error as Error).message },
      { status: 500 },
    );
  }
}
