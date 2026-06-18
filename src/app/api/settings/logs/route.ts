import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ActivityLog from "@/models/ActivityLog";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();

    const query: Record<string, any> = {};
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "30");

    const logs = await ActivityLog.find(query)
      .populate("userId", "username email role")
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch activity logs", error: (error as Error).message },
      { status: 500 }
    );
  }
}
