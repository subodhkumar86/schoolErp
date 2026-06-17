import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import Fee from "@/models/Fee";
import Attendance from "@/models/Attendance";
import Notice from "@/models/Notice";
import Exam from "@/models/Exam";
import School from "@/models/School";
import User from "@/models/User";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();

    // 1. Super Admin Dashboard Metrics
    if (role === "Super Admin") {
      const [
        totalSchools,
        activeSchools,
        totalUsers,
        activeUsers,
        trialSchools,
        activeSubscriptions,
        expiredSubscriptions,
        revenueSummary,
      ] = await Promise.all([
        School.countDocuments(),
        School.countDocuments({ "subscription.status": "Active" }),
        User.countDocuments(),
        User.countDocuments({ status: "Active" }),
        School.countDocuments({ "subscription.status": "Trial" }),
        School.countDocuments({ "subscription.status": "Active" }),
        School.countDocuments({ "subscription.status": "Expired" }),
        // Calculate dynamic platform revenue based on simulated plan prices
        School.aggregate([
          { $match: { "subscription.status": "Active" } },
          {
            $group: {
              _id: "$subscription.plan",
              count: { $sum: 1 },
            },
          },
        ]),
      ]);

      // Calculate total platform revenue: Starter = 1000/mo, Pro = 3000/mo, Enterprise = 10000/mo
      let platformMonthlyRevenue = 0;
      revenueSummary.forEach((planGroup) => {
        if (planGroup._id === "Starter") platformMonthlyRevenue += planGroup.count * 1000;
        if (planGroup._id === "Professional") platformMonthlyRevenue += planGroup.count * 3000;
        if (planGroup._id === "Enterprise") platformMonthlyRevenue += planGroup.count * 10000;
      });

      // Fetch all schools for the Super Admin management list
      const schools = await School.find({}).sort({ createdAt: -1 });

      return NextResponse.json({
        isSuperAdmin: true,
        totalSchools,
        activeSchools,
        totalUsers,
        activeUsers,
        trialSchools,
        activeSubscriptions,
        expiredSubscriptions,
        platformMonthlyRevenue,
        schools,
        planSplit: revenueSummary,
      });
    }

    // 2. School-Isolated Dashboard Metrics
    const query: Record<string, any> = { schoolId };

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

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
      Student.countDocuments(query),
      Student.countDocuments({ ...query, status: "Active" }),
      Teacher.countDocuments(query),
      Teacher.countDocuments({ ...query, status: "Active" }),
      Fee.aggregate([
        { $match: { ...query, status: "Paid" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Fee.aggregate([
        { $match: { ...query, status: { $in: ["Pending", "Overdue"] } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Attendance.countDocuments({
        ...query,
        entityType: "Student",
        date: {
          $gte: startOfToday,
          $lt: endOfToday,
        },
        status: "Present",
      }),
      Student.find(query).sort({ createdAt: -1 }).limit(5),
      Notice.find({ ...query, status: "Active" }).sort({ postedDate: -1 }).limit(5),
      Exam.find({ ...query, date: { $gte: new Date() } }).sort({ date: 1 }).limit(5),
    ]);

    return NextResponse.json({
      isSuperAdmin: false,
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
      { message: "Failed to fetch dashboard stats", error: (error as Error).message },
      { status: 500 },
    );
  }
}
