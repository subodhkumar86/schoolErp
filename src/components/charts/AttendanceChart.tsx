"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", attendance: 90 },
  { month: "Feb", attendance: 92 },
  { month: "Mar", attendance: 89 },
  { month: "Apr", attendance: 94 },
  { month: "May", attendance: 96 },
  { month: "Jun", attendance: 95 },
];

export default function AttendanceChart() {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Attendance Trend</h3>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="attendance" fill="#16a34a" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
