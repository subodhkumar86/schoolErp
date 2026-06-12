"use client";

import { Users, UserCheck, UserX, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";
import { useStudents } from "../hooks/useStudents";

export default function StudentsStats() {
  const { data: response } = useStudents({ limit: 1000 });
  const students = response?.data ?? [];

  const totalStudents = response?.total ?? 0;

  const activeStudents = students.filter(
    (s) => s.status === "Active",
  ).length;

  const inactiveStudents = students.filter(
    (s) => s.status === "Inactive",
  ).length;

  const averageAttendance =
    students.length > 0
      ? Math.round(
          students.reduce(
            (sum, s) => sum + ((s.attendance as number) || 0),
            0,
          ) / students.length,
        )
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Students"
        value={totalStudents}
        icon={<Users className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Active Students"
        value={activeStudents}
        icon={<UserCheck className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="Inactive Students"
        value={inactiveStudents}
        icon={<UserX className="h-10 w-10 text-red-500" />}
        color="text-red-500"
      />

      <StatCard
        title="Avg Attendance"
        value={`${averageAttendance}%`}
        icon={<GraduationCap className="h-10 w-10 text-blue-500" />}
        color="text-blue-500"
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h3>
        </div>
        {icon}
      </div>
    </div>
  );
}
