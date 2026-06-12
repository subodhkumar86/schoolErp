"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 200000 },
  { month: "Feb", revenue: 240000 },
  { month: "Mar", revenue: 300000 },
  { month: "Apr", revenue: 350000 },
  { month: "May", revenue: 420000 },
  { month: "Jun", revenue: 480000 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Revenue Trend</h3>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#f59e0b"
              fill="#fef3c7"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
