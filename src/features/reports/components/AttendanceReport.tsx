"use client";

import { useReports } from "../hooks/useReports";
import Loader from "@/components/shared/Loader";

export default function AttendanceReport() {
  const { data, isLoading } = useReports();

  if (isLoading) return <Loader />;

  const report = data?.attendanceReport || [];

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Attendance Trends</h2>
      <div className="space-y-3">
        {report.map((item) => (
          <div key={item.month} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
            <span className="font-medium text-foreground">{item.month}</span>
            <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-600">
              {item.attendance}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
