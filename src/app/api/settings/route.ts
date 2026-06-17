import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/Setting";
import { getSession } from "@/lib/session";

export async function GET() {
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
    } else {
      // Super Admin default or first setting
      const settings = await Setting.findOne({});
      return NextResponse.json(settings || {});
    }

    if (!query.schoolId) {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    let settings = await Setting.findOne(query);
    if (!settings) {
      settings = await Setting.create({
        schoolId: query.schoolId,
        schoolName: session.school?.name || "My School",
        schoolEmail: session.school?.email || "admin@school.com",
        schoolAddress: session.school?.address || "School Address",
      });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch settings", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const body = await request.json();

    const query: Record<string, any> = {};
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    } else {
      // Super Admin can update the global first setting or by body.schoolId
      const targetSchoolId = body.schoolId || null;
      if (targetSchoolId) query.schoolId = targetSchoolId;
    }

    let settings = await Setting.findOne(query);

    if (!settings) {
      settings = await Setting.create({
        ...body,
        schoolId: query.schoolId || schoolId,
      });
    } else {
      settings = await Setting.findByIdAndUpdate(settings._id, body, {
        new: true,
        runValidators: true,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update settings", error: (error as Error).message },
      { status: 500 }
    );
  }
}
