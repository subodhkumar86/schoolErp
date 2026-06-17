"use client";

import React, { ReactNode } from "react";
import { Users, UserCheck, UserX, GraduationCap } from "lucide-react";
import { useTeachers } from "../hooks/useTeachers";
import type { Teacher } from "../types/teacher";

const colorVariants = {
  blue: {
    border: "hover:border-blue-500/20 dark:hover:border-blue-500/20",
    glow: "bg-blue-550/5 group-hover:bg-blue-500/10",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  emerald: {
    border: "hover:border-emerald-500/20 dark:hover:border-emerald-500/20",
    glow: "bg-emerald-550/5 group-hover:bg-emerald-500/10",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  rose: {
    border: "hover:border-rose-500/20 dark:hover:border-rose-500/20",
    glow: "bg-rose-550/5 group-hover:bg-rose-500/10",
    iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  violet: {
    border: "hover:border-violet-500/20 dark:hover:border-violet-500/20",
    glow: "bg-violet-550/5 group-hover:bg-violet-500/10",
    iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
};

function StatCard({
  title,
  value,
  icon,
  color,
  variant,
}: {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  variant: "blue" | "emerald" | "rose" | "violet";
}) {
  const styles = colorVariants[variant];

  return (
    <div
      className={`relative overflow-hidden border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group ${styles.border}`}
    >
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-xl transition-all duration-300 ${styles.glow}`} />
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className={`mt-2 text-3xl font-extrabold text-slate-900 dark:text-slate-50 ${color}`}>
            {value}
          </h3>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${styles.iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

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
        icon={<Users className="h-5 w-5" />}
        color=""
        variant="blue"
      />

      <StatCard
        title="Active Teachers"
        value={activeTeachers}
        icon={<UserCheck className="h-5 w-5" />}
        color="text-emerald-600 dark:text-emerald-400"
        variant="emerald"
      />

      <StatCard
        title="Inactive Teachers"
        value={inactiveTeachers}
        icon={<UserX className="h-5 w-5" />}
        color="text-rose-600 dark:text-rose-400"
        variant="rose"
      />

      <StatCard
        title="Avg Experience"
        value={`${averageExperience} yrs`}
        icon={<GraduationCap className="h-5 w-5" />}
        color="text-violet-600 dark:text-violet-400"
        variant="violet"
      />
    </div>
  );
}
