import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
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
    const { studentIds, targetClass, action } = body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json({ message: "Student IDs are required" }, { status: 400 });
    }

    const query: Record<string, any> = { _id: { $in: studentIds } };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    if (action === "Promote") {
      if (!targetClass) {
        return NextResponse.json({ message: "Target class is required for promotion" }, { status: 400 });
      }

      await Student.updateMany(query, {
        $set: { studentClass: targetClass },
      });

      if (session.user && schoolId) {
        await logActivity(
          schoolId.toString(),
          session.user.id,
          "Student Promotion",
          `Promoted ${studentIds.length} students to Class ${targetClass} by ${session.user.username}.`
        );
      }

      return NextResponse.json({
        message: `Successfully promoted ${studentIds.length} students to ${targetClass}`,
      });
    } else {
      // Retain in same class
      if (session.user && schoolId) {
        await logActivity(
          schoolId.toString(),
          session.user.id,
          "Student Retention",
          `Retained ${studentIds.length} students in their current classes by ${session.user.username}.`
        );
      }
      return NextResponse.json({
        message: `Retained ${studentIds.length} students in their current classes`,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to promote students", error: (error as Error).message },
      { status: 500 }
    );
  }
}
