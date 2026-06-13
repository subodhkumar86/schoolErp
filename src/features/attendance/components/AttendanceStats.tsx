"use client";

import { Users, CheckCircle, XCircle, Clock } from "lucide-react";
import type { ReactNode } from "react";
import { useAttendances } from "../hooks/useAttendances";

export default function AttendanceStats({
  type,
  search,
  studentClass,
  department,
  date,
}: {
  type: "Student" | "Teacher";
  search?: string;
  studentClass?: string;
  department?: string;
  date?: string;
}) {
  const { data: response } = useAttendances({
    type,
    search,
    studentClass,
    department,
    date,
    limit: 1000,
  });
  const records = response?.data ?? [];

  const present = records.filter((item) => item.status === "Present").length;
  const absent = records.filter((item) => item.status === "Absent").length;
  const late = records.filter((item) => item.status === "Late").length;
  const leave = records.filter((item) => item.status === "Leave").length;
  const total = records.length;

  const presentPercentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Records"
        value={total}
        subtext={`${presentPercentage}% attendance rate`}
        icon={<Users className="h-8 w-8 text-primary" />}
        color="text-primary"
      />
      <StatCard
        title="Present"
        value={present}
        subtext={total > 0 ? `${Math.round((present / total) * 100)}%` : "0%"}
        icon={<CheckCircle className="h-8 w-8 text-green-500" />}
        color="text-green-500"
      />
      <StatCard
        title="Absent"
        value={absent}
        subtext={total > 0 ? `${Math.round((absent / total) * 100)}%` : "0%"}
        icon={<XCircle className="h-8 w-8 text-red-500" />}
        color="text-red-500"
      />
      <StatCard
        title="Late / Leave"
        value={late + leave}
        subtext={`Late: ${late} | Leave: ${leave}`}
        icon={<Clock className="h-8 w-8 text-yellow-500" />}
        color="text-yellow-500"
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  subtext,
  icon,
  color,
}: {
  title: string;
  value: number;
  subtext?: string;
  icon: ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h3>
          {subtext && (
            <p className="mt-1 text-xs text-muted-foreground">{subtext}</p>
          )}
        </div>
        {icon}
      </div>
    </div>
  );
}
