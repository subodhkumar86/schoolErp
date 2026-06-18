import { connectDB } from "@/lib/mongodb";
import ActivityLog from "@/models/ActivityLog";

export async function logActivity(
  schoolId: string,
  userId: string,
  action: string,
  details: string
) {
  try {
    await connectDB();
    await ActivityLog.create({
      schoolId,
      userId,
      action,
      details,
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
