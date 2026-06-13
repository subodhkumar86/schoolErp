"use client";

import { School, CheckCircle, AlertCircle, Users } from "lucide-react";
import type { ReactNode } from "react";
import { useClasses } from "../hooks/useClasses";
import type { ClassType } from "../types/class";

export default function ClassesStats() {
  const { data: response } = useClasses({ limit: 1000 });
  const classes: ClassType[] = response?.data ?? [];
  const totalClasses = response?.total ?? 0;

  const activeClasses = classes.filter((c) => c.status === "Active").length;
  const inactiveClasses = classes.filter((c) => c.status === "Inactive").length;

  const averageCapacity =
    classes.length > 0
      ? Math.round(
          classes.reduce((sum, c) => sum + (c.capacity || 0), 0) /
            classes.length,
        )
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Classes"
        value={totalClasses}
        icon={<School className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Active Classes"
        value={activeClasses}
        icon={<CheckCircle className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="Inactive Classes"
        value={inactiveClasses}
        icon={<AlertCircle className="h-10 w-10 text-red-500" />}
        color="text-red-500"
      />

      <StatCard
        title="Avg Capacity"
        value={`${averageCapacity} stds`}
        icon={<Users className="h-10 w-10 text-blue-500" />}
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
