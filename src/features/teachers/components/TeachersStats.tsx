"use client";

import { Users, UserCheck, UserX, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";
import { useTeachers } from "../hooks/useTeachers";
import type { Teacher } from "../types/teacher";

export default function TeachersStats() {
  const { data: response } = useTeachers({ limit: 1000 });
  const teachers: Teacher[] = response?.data ?? [];
  const totalTeachers = response?.total ?? 0;

  const activeTeachers = teachers.filter((t) => t.status === "Active").length;
  const inactiveTeachers = teachers.filter((t) => t.status === "Inactive").length;

  const averageExperience =
    teachers.length > 0
      ? Math.round(
          teachers.reduce((sum, t) => sum + (t.experience || 0), 0) /
            teachers.length,
        )
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Teachers"
        value={totalTeachers}
        icon={<Users className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Active Teachers"
        value={activeTeachers}
        icon={<UserCheck className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="Inactive Teachers"
        value={inactiveTeachers}
        icon={<UserX className="h-10 w-10 text-red-500" />}
        color="text-red-500"
      />

      <StatCard
        title="Avg Experience"
        value={`${averageExperience} yrs`}
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
