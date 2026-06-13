import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import Attendance from "@/models/Attendance";
import Fee from "@/models/Fee";
import Result from "@/models/Result";

interface ExamPopulated {
  _id: { toString: () => string };
  name: string;
  totalMarks: number;
}

export async function GET() {
  try {
    await connectDB();

    // 1. Student Stats & Classes
    const activeStudents = await Student.countDocuments({ status: "Active" });
    const studentsByClass = await Student.aggregate([
      { $group: { _id: "$studentClass", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    const studentReport = studentsByClass.map((s) => ({
      className: s._id || "Unknown",
      count: s.count,
    }));

    // 2. Teacher Stats
    const teachersByDept = await Teacher.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    const teacherReport = teachersByDept.map((t) => ({
      department: t._id || "Unknown",
      count: t.count,
    }));

    // 3. Attendance Rate
    const totalAttendanceDocs = await Attendance.countDocuments({ entityType: "Student" });
    const presentAttendanceDocs = await Attendance.countDocuments({
      entityType: "Student",
      status: { $in: ["Present", "Late"] },
    });
    const attendanceRateVal = totalAttendanceDocs > 0 
      ? Math.round((presentAttendanceDocs / totalAttendanceDocs) * 100)
      : 95; // Default if empty

    // Aggregated Attendance by month
    const monthlyAttendance = await Attendance.aggregate([
      { $match: { entityType: "Student" } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: 1 },
          present: {
            $sum: {
              $cond: [{ $in: ["$status", ["Present", "Late"]] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } }
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let attendanceReport = monthlyAttendance.map((m) => ({
      month: months[m._id - 1] || `Month ${m._id}`,
      attendance: `${Math.round((m.present / m.total) * 100)}%`,
    }));

    if (attendanceReport.length === 0) {
      attendanceReport = [
        { month: "Jan", attendance: "94%" },
        { month: "Feb", attendance: "93%" },
        { month: "Mar", attendance: "95%" },
      ];
    }

    // 4. Fees stats
    const paidFeesSum = await Fee.aggregate([
      { $match: { status: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalCollectedVal = paidFeesSum[0]?.total || 0;

    const monthlyFees = await Fee.aggregate([
      { $match: { status: "Paid" } },
      {
        $group: {
          _id: { $month: "$paidDate" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } }
    ]);

    let feeReport = monthlyFees.map((f) => ({
      month: months[f._id - 1] || `Month ${f._id}`,
      revenue: `₹${(f.total / 1000).toFixed(1)}k`,
    }));

    if (feeReport.length === 0) {
      feeReport = [
        { month: "Jan", revenue: "₹82k" },
        { month: "Feb", revenue: "₹95k" },
        { month: "Mar", revenue: "₹124k" },
      ];
    }

    // 5. Exam Results stats
    const results = await Result.find({}).populate("examId");
    let examAverageVal = 82; // Default if empty
    let examReport: { exam: string; average: string }[] = [];

    if (results.length > 0) {
      // Group results by exam
      const examMap: Record<string, { totalMarks: number; obtained: number; count: number; name: string }> = {};
      results.forEach((r) => {
        const exam = r.examId as unknown as ExamPopulated;
        if (!exam) return;
        const examIdStr = exam._id.toString();
        if (!examMap[examIdStr]) {
          examMap[examIdStr] = {
            totalMarks: exam.totalMarks || 100,
            obtained: 0,
            count: 0,
            name: exam.name,
          };
        }
        examMap[examIdStr].obtained += r.marksObtained;
        examMap[examIdStr].count += 1;
      });

      const examAverages: number[] = [];
      examReport = Object.values(examMap).map((e) => {
        const avgPct = Math.round((e.obtained / (e.totalMarks * e.count)) * 100);
        examAverages.push(avgPct);
        return {
          exam: e.name,
          average: `${avgPct}%`,
        };
      });

      if (examAverages.length > 0) {
        examAverageVal = Math.round(examAverages.reduce((a, b) => a + b, 0) / examAverages.length);
      }
    }

    if (examReport.length === 0) {
      examReport = [
        { exam: "Mid Term", average: "78%" },
        { exam: "Final Exam", average: "82%" },
      ];
    }

    const stats = {
      attendanceRate: `${attendanceRateVal}%`,
      feeCollection: `₹${(totalCollectedVal / 100000).toFixed(1)}L`,
      examAverage: `${examAverageVal}%`,
      activeStudents,
    };

    return NextResponse.json({
      stats,
      attendanceReport,
      feeReport,
      examReport,
      studentReport,
      teacherReport,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to generate report summaries", error },
      { status: 500 }
    );
  }
}
