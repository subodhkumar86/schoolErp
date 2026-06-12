"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", students: 800 },
  { month: "Feb", students: 850 },
  { month: "Mar", students: 920 },
  { month: "Apr", students: 980 },
  { month: "May", students: 1100 },
  { month: "Jun", students: 1250 },
];

export default function StudentGrowthChart() {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Student Growth</h3>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="students"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
