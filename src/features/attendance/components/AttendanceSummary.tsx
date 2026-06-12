"use client";

import { useAttendances } from "../hooks/useAttendances";

export default function AttendanceSummary() {
  const { data: response } = useAttendances({ type: "Student" });
  const records = response?.data ?? [];
  const total = records.length;

  const present = total > 0
    ? Math.round((records.filter((r) => r.status === "Present").length / total) * 100)
    : 0;

  const absent = 100 - present;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl bg-green-500 p-6 text-white">
        <h3 className="text-lg font-semibold">Present</h3>
        <p className="mt-2 text-4xl font-bold">{present}%</p>
      </div>

      <div className="rounded-2xl bg-red-500 p-6 text-white">
        <h3 className="text-lg font-semibold">Absent</h3>
        <p className="mt-2 text-4xl font-bold">{absent}%</p>
      </div>

      <div className="rounded-2xl bg-blue-600 p-6 text-white">
        <h3 className="text-lg font-semibold">Total Records</h3>
        <p className="mt-2 text-4xl font-bold">{response?.total ?? 0}</p>
      </div>
    </div>
  );
}
