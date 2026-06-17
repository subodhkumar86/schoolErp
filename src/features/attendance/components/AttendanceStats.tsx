"use client";

import React, { ReactNode } from "react";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { useAttendances } from "../hooks/useAttendances";

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
  amber: {
    border: "hover:border-amber-500/20 dark:hover:border-amber-500/20",
    glow: "bg-amber-550/5 group-hover:bg-amber-500/10",
    iconBg: "bg-amber-500/10 text-amber-650 dark:text-amber-400",
  },
};

function StatCard({
  title,
  value,
  subtext,
  icon,
  color,
  variant,
}: {
  title: string;
  value: number;
  subtext?: string;
  icon: ReactNode;
  color: string;
  variant: "blue" | "emerald" | "rose" | "amber";
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
          {subtext && (
            <p className="mt-1.5 text-xs font-medium text-slate-450 dark:text-slate-500">
              {subtext}
            </p>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${styles.iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

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
        icon={<Users className="h-5 w-5" />}
        color=""
        variant="blue"
      />
      <StatCard
        title="Present"
        value={present}
        subtext={total > 0 ? `${Math.round((present / total) * 100)}% present` : "0% present"}
        icon={<CheckCircle className="h-5 w-5" />}
        color="text-emerald-600 dark:text-emerald-400"
        variant="emerald"
      />
      <StatCard
        title="Absent"
        value={absent}
        subtext={total > 0 ? `${Math.round((absent / total) * 100)}% absent` : "0% absent"}
        icon={<XCircle className="h-5 w-5" />}
        color="text-rose-600 dark:text-rose-400"
        variant="rose"
      />
      <StatCard
        title="Late / Leave"
        value={late + leave}
        subtext={`Late: ${late} | Leave: ${leave}`}
        icon={<Clock className="h-5 w-5" />}
        color="text-amber-600 dark:text-amber-450"
        variant="amber"
      />
    </div>
  );
}
