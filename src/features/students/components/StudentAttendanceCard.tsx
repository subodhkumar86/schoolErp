"use client";

import { useParams } from "next/navigation";
import { useStudent } from "../hooks/useStudent";
import Loader from "@/components/shared/Loader";

export default function StudentAttendanceCard() {
  const params = useParams();
  const studentId = params.id as string;
  const { data: student, isLoading } = useStudent(studentId);

  if (isLoading) return <Loader />;
  if (!student) return null;

  const attendancePercent = student.attendance ?? 100;

  // Determine color matching attendance criteria
  const isGood = attendancePercent >= 90;
  const isBorderline = attendancePercent >= 75 && attendancePercent < 90;

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">Attendance Overview</h3>

      <div className="flex items-center gap-6">
        <div
          className={`text-5xl font-extrabold ${
            isGood
              ? "text-emerald-500"
              : isBorderline
                ? "text-amber-500"
                : "text-rose-500"
          }`}
        >
          {attendancePercent}%
        </div>
        <div className="flex-1">
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isGood
                  ? "bg-emerald-500"
                  : isBorderline
                    ? "bg-amber-500"
                    : "bg-rose-500"
              }`}
              style={{ width: `${attendancePercent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Academic Session Attendance requirement: 75% minimum
          </p>
        </div>
      </div>

      <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <span className="text-xs text-muted-foreground block">Status</span>
          <span
            className={`text-sm font-bold ${
              attendancePercent >= 75 ? "text-green-600" : "text-red-600"
            }`}
          >
            {attendancePercent >= 75 ? "Eligible for Exams" : "Low Attendance"}
          </span>
        </div>
        <div>
          <span className="text-xs text-muted-foreground block">Category</span>
          <span className="text-sm font-semibold">
            {attendancePercent >= 90
              ? "Excellent"
              : attendancePercent >= 75
                ? "Average"
                : "Critical"}
          </span>
        </div>
      </div>
    </div>
  );
}
