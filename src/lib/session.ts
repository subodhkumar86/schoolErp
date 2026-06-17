import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import School from "@/models/School";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";

export async function getSession() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return null;

    const payload = await verifyJWT(token);
    if (!payload) return null;

    const user = await User.findById(payload.userId).select("-password").lean();
    if (!user || user.status !== "Active") return null;

    let school = null;
    if (user.schoolId) {
      school = await School.findById(user.schoolId).lean();
    }

    return {
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId ? user.schoolId.toString() : null,
      },
      userId: user._id.toString(),
      schoolId: user.schoolId ? user.schoolId.toString() : null,
      school,
      role: user.role,
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function checkSubscriptionLimit(schoolId: string, modelName: "Student" | "Teacher") {
  try {
    await connectDB();
    const school = await School.findById(schoolId);
    if (!school) {
      return { allowed: false, message: "School tenant not found." };
    }

    const plan = school.subscription?.plan || "Starter";
    const status = school.subscription?.status || "Trial";

    if (status === "Expired") {
      return { allowed: false, message: "Your school subscription has expired. Please upgrade or renew." };
    }

    if (modelName === "Student") {
      const count = await Student.countDocuments({ schoolId });
      const limit = school.subscription?.limitStudents ?? 100;
      if (plan !== "Enterprise" && count >= limit) {
        return {
          allowed: false,
          message: `Student limit reached (${count}/${limit}) for your ${plan} plan. Please upgrade to a higher plan.`,
        };
      }
    }

    if (modelName === "Teacher") {
      const count = await Teacher.countDocuments({ schoolId });
      const limit = school.subscription?.limitTeachers ?? 10;
      if (plan !== "Enterprise" && count >= limit) {
        return {
          allowed: false,
          message: `Teacher limit reached (${count}/${limit}) for your ${plan} plan. Please upgrade to a higher plan.`,
        };
      }
    }

    return { allowed: true };
  } catch (error) {
    console.error("Error checking subscription limit:", error);
    return { allowed: false, message: "Error validating subscription limits." };
  }
}
