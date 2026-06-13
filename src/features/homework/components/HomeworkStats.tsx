"use client";

import { BookOpen, CheckCircle2, XCircle, Award } from "lucide-react";
import type { ReactNode } from "react";
import { useHomeworks } from "../hooks/useHomeworks";
import type { HomeworkType } from "../types/homework";

export default function HomeworkStats() {
  const { data: response } = useHomeworks({ limit: 1000 });
  const homeworks = (response?.data ?? []) as unknown as HomeworkType[];
  const total = homeworks.length;

  const active = homeworks.filter((h) => h.status === "Active").length;
  const closed = homeworks.filter((h) => h.status === "Closed").length;

  const averageMaxPoints =
    total > 0
      ? Math.round(
          homeworks.reduce((sum, h) => sum + (h.maxPoints || 0), 0) / total,
        )
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Assignments"
        value={total}
        icon={<BookOpen className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Active Tasks"
        value={active}
        icon={<CheckCircle2 className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="Closed Tasks"
        value={closed}
        icon={<XCircle className="h-10 w-10 text-red-500" />}
        color="text-red-500"
      />

      <StatCard
        title="Avg Max Points"
        value={`${averageMaxPoints} pts`}
        icon={<Award className="h-10 w-10 text-blue-500" />}
        color="text-blue-500"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
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
