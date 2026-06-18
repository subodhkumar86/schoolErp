import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admission from "@/models/Admission";
import Student from "@/models/Student";
import User from "@/models/User";
import { getSession, checkSubscriptionLimit } from "@/lib/session";
import { hashPassword } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const admission = await Admission.findOne(query);
    if (!admission) {
      return NextResponse.json({ message: "Admission application not found" }, { status: 404 });
    }
    return NextResponse.json(admission);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch admission application", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const admission = await Admission.findOne(query);
    if (!admission) {
      return NextResponse.json({ message: "Admission application not found or access denied" }, { status: 404 });
    }

    const prevStatus = admission.status;
    const nextStatus = body.status;

    // Check if promoting to Approved
    if (nextStatus === "Approved" && prevStatus !== "Approved") {
      // 1. Enforce subscription student limit check
      if (role !== "Super Admin" && schoolId) {
        const limitCheck = await checkSubscriptionLimit(schoolId.toString(), "Student");
        if (!limitCheck.allowed) {
          return NextResponse.json({ message: limitCheck.message }, { status: 403 });
        }
      }

      // 2. Generate a unique roll number for the new student
      const randomSuffix = Math.floor(100 + Math.random() * 900); // 3 digit random suffix
      const rollNumber = `R-${Date.now().toString().slice(-4)}-${randomSuffix}`;

      // 3. Create Student profile
      const student = await Student.create({
        schoolId: admission.schoolId,
        name: admission.studentName,
        email: admission.email || `${rollNumber.toLowerCase()}@global.com`,
        phone: admission.phone,
        rollNumber,
        studentClass: admission.appliedClass,
        gender: admission.gender,
        dateOfBirth: admission.dateOfBirth,
        address: admission.address,
        parentName: admission.parentName,
        parentPhone: admission.parentPhone,
        attendance: 100,
        status: "Active",
      });

      // 4. Auto-create user login details for the student
      const defaultPassword = await hashPassword("password123");
      const baseUsername = admission.email 
        ? admission.email.trim().toLowerCase().split("@")[0] 
        : admission.studentName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
      let username = baseUsername || "student";
      let exists = await User.findOne({ username });
      let counter = 1;
      while (exists) {
        username = `${baseUsername}${counter}`;
        exists = await User.findOne({ username });
        counter++;
      }

      const emailVal = admission.email ? admission.email.trim().toLowerCase() : `${username}@global.com`;

      const existingUser = await User.findOne({ email: emailVal });
      if (!existingUser) {
        await User.create({
          username,
          email: emailVal,
          password: defaultPassword,
          role: "Student",
          schoolId: admission.schoolId,
          entityId: student._id,
          entityModel: "Student",
          status: "Active",
        });
      }
    }

    // Update the admission application fields
    const updated = await Admission.findOneAndUpdate(
      query,
      {
        studentName: body.studentName,
        email: body.email,
        phone: body.phone,
        appliedClass: body.appliedClass,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        parentName: body.parentName,
        parentPhone: body.parentPhone,
        address: body.address,
        status: body.status,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update admission application", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const admission = await Admission.findOneAndDelete(query);
    if (!admission) {
      return NextResponse.json({ message: "Admission application not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Admission application deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete admission application", error: (error as Error).message },
      { status: 500 }
    );
  }
}
