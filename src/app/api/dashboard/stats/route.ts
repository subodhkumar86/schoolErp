import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import Fee from "@/models/Fee";
import Attendance from "@/models/Attendance";
import Notice from "@/models/Notice";
import Exam from "@/models/Exam";

export async function GET() {
  try {
    await connectDB();

    const [
      totalStudents,
      activeStudents,
      totalTeachers,
      activeTeachers,
      totalRevenue,
      pendingFees,
      todayAttendance,
      recentStudents,
      recentNotices,
      upcomingExams,
    ] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: "Active" }),
      Teacher.countDocuments(),
      Teacher.countDocuments({ status: "Active" }),
      Fee.aggregate([
        { $match: { status: "Paid" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Fee.aggregate([
        { $match: { status: { $in: ["Pending", "Overdue"] } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Attendance.countDocuments({
        entityType: "Student",
        date: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        status: "Present",
      }),
      Student.find({}).sort({ createdAt: -1 }).limit(5),
      Notice.find({ status: "Active" }).sort({ postedDate: -1 }).limit(5),
      Exam.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(5),
    ]);

    return NextResponse.json({
      totalStudents,
      activeStudents,
      inactiveStudents: totalStudents - activeStudents,
      totalTeachers,
      activeTeachers,
      totalRevenue: totalRevenue[0]?.total ?? 0,
      pendingFees: pendingFees[0]?.total ?? 0,
      todayAttendance,
      recentStudents,
      recentNotices,
      upcomingExams,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch dashboard stats", error },
      { status: 500 },
    );
  }
}
