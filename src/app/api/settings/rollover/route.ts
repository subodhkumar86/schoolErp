import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/Setting";
import { getSession } from "@/lib/session";
import { logActivity } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const body = await request.json();
    const { nextSession } = body;

    if (!nextSession || typeof nextSession !== "string") {
      return NextResponse.json({ message: "Next academic session year is required" }, { status: 400 });
    }

    const query: Record<string, any> = {};
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const setting = await Setting.findOneAndUpdate(
      query,
      { $set: { sessionYear: nextSession } },
      { new: true, runValidators: true }
    );

    if (!setting) {
      return NextResponse.json({ message: "School settings record not found or access denied" }, { status: 404 });
    }

    if (session.user && schoolId) {
      await logActivity(
        schoolId.toString(),
        session.user.id,
        "Session Rollover",
        `Academic session rolled over to ${nextSession} by ${session.user.username}.`
      );
    }

    return NextResponse.json({
      message: `Successfully rolled over academic session to ${nextSession}`,
      setting,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to rollover academic session", error: (error as Error).message },
      { status: 500 }
    );
  }
}
