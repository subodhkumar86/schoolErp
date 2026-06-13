"use client";

import { useReports } from "../hooks/useReports";
import Loader from "@/components/shared/Loader";

export default function ReportStats() {
  const { data, isLoading, isError } = useReports();

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-destructive font-medium">Failed to load statistics</div>;

  const stats = data?.stats || {
    attendanceRate: "0%",
    feeCollection: "₹0L",
    examAverage: "0%",
    activeStudents: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm">
        <p className="text-sm opacity-90">Attendance Rate</p>
        <h2 className="text-3xl font-bold mt-2">{stats.attendanceRate}</h2>
      </div>

      <div className="rounded-2xl bg-green-600 p-6 text-white shadow-sm">
        <p className="text-sm opacity-90">Fee Collection</p>
        <h2 className="text-3xl font-bold mt-2">{stats.feeCollection}</h2>
      </div>

      <div className="rounded-2xl bg-purple-600 p-6 text-white shadow-sm">
        <p className="text-sm opacity-90">Exam Average</p>
        <h2 className="text-3xl font-bold mt-2">{stats.examAverage}</h2>
      </div>

      <div className="rounded-2xl bg-orange-500 p-6 text-white shadow-sm">
        <p className="text-sm opacity-90">Students</p>
        <h2 className="text-3xl font-bold mt-2">{stats.activeStudents}</h2>
      </div>
    </div>
  );
}
