import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import School from "@/models/School";
import User from "@/models/User";
import Setting from "@/models/Setting";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { schoolName, adminEmail, adminUsername, adminPassword, plan } = body;

    if (!schoolName || !adminEmail || !adminUsername || !adminPassword) {
      return NextResponse.json(
        { message: "All fields (School Name, Email, Username, Password) are required" },
        { status: 400 }
      );
    }

    const emailLower = adminEmail.trim().toLowerCase();
    const usernameLower = adminUsername.trim().toLowerCase();

    // 1. Verify User Uniqueness (global unique constraint)
    const existingUser = await User.findOne({
      $or: [{ email: emailLower }, { username: usernameLower }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "A user with this email or username already exists" },
        { status: 400 }
      );
    }

    // 2. Generate a unique school slug
    const baseSlug = schoolName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let slug = baseSlug || "school";
    let slugExists = await School.findOne({ slug });
    let counter = 1;
    while (slugExists) {
      slug = `${baseSlug}-${counter}`;
      slugExists = await School.findOne({ slug });
      counter++;
    }

    // 3. Create the School/Tenant
    const school = await School.create({
      name: schoolName.trim(),
      slug,
      email: emailLower,
      subscription: {
        plan: plan || "Starter",
        status: "Trial",
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        limitStudents: plan === "Enterprise" ? 99999 : plan === "Professional" ? 500 : 100,
        limitTeachers: plan === "Enterprise" ? 999 : plan === "Professional" ? 50 : 10,
      },
    });

    // 4. Create default Setting record for this school
    await Setting.create({
      schoolName: school.name,
      schoolId: school._id,
      schoolEmail: emailLower,
      schoolAddress: "Please update your school address",
      sessionYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      currency: "INR",
      timezone: "Asia/Kolkata",
    });

    // 5. Hash password & create the Admin User
    const hashedPassword = await hashPassword(adminPassword);
    const adminUser = await User.create({
      username: usernameLower,
      email: emailLower,
      password: hashedPassword,
      role: "Admin",
      schoolId: school._id,
      entityModel: "Admin",
      status: "Active",
    });

    return NextResponse.json(
      {
        message: "School registered successfully",
        schoolId: school._id,
        adminUser: {
          id: adminUser._id,
          username: adminUser.username,
          email: adminUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed", error: (error as Error).message },
      { status: 500 }
    );
  }
}
