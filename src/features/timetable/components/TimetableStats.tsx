"use client";

import { Calendar, Users, Layout } from "lucide-react";
import type { ReactNode } from "react";
import { useTimetables } from "../hooks/useTimetables";

export default function TimetableStats() {
  const { data: response } = useTimetables({ limit: 1 });
  const stats = response?.stats || {
    totalSlots: 0,
    classesScheduled: 0,
    teachersAssigned: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Scheduled Slots"
        value={stats.totalSlots}
        icon={<Calendar className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Active Classes"
        value={stats.classesScheduled}
        icon={<Layout className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="Teachers Assigned"
        value={stats.teachersAssigned}
        icon={<Users className="h-10 w-10 text-purple-500" />}
        color="text-purple-500"
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
          <h3 className={`mt-2 text-2xl font-bold ${color}`}>{value}</h3>
        </div>
        {icon}
      </div>
    </div>
  );
}
