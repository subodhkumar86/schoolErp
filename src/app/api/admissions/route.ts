import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admission from "@/models/Admission";
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
    const appliedClass = searchParams.get("class") || "";
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
        { studentName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { parentName: { $regex: search, $options: "i" } },
      ];
    }

    if (appliedClass) query.appliedClass = appliedClass;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Admission.countDocuments(query);
    const admissions = await Admission.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Dynamic stats based on filtered schoolId
    const statsQuery: Record<string, any> = {};
    if (role !== "Super Admin") {
      statsQuery.schoolId = schoolId;
    }

    const [totalApplications, pendingApplications, approvedApplications, rejectedApplications] = await Promise.all([
      Admission.countDocuments(statsQuery),
      Admission.countDocuments({ ...statsQuery, status: "Pending" }),
      Admission.countDocuments({ ...statsQuery, status: "Approved" }),
      Admission.countDocuments({ ...statsQuery, status: "Rejected" }),
    ]);

    const stats = {
      total: totalApplications,
      pending: pendingApplications,
      approved: approvedApplications,
      rejected: rejectedApplications,
    };

    return NextResponse.json({ data: admissions, total, stats, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch admissions", error: (error as Error).message },
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
    if (!targetSchoolId) {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    const admission = await Admission.create({
      schoolId: targetSchoolId,
      studentName: body.studentName,
      email: body.email,
      phone: body.phone,
      appliedClass: body.appliedClass,
      gender: body.gender || "Male",
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
      parentName: body.parentName,
      parentPhone: body.parentPhone,
      address: body.address,
      status: body.status || "Pending",
    });

    return NextResponse.json(admission, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create admission application", error: (error as Error).message },
      { status: 500 }
    );
  }
}
