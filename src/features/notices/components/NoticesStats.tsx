"use client";

import { Megaphone, AlertCircle, FileLock } from "lucide-react";
import type { ReactNode } from "react";
import { useNotices } from "../hooks/useNotices";

export default function NoticesStats() {
  const { data: response } = useNotices({ limit: 1 });
  const stats = response?.stats || {
    totalNotices: 0,
    activeNotices: 0,
    archivedNotices: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Announcements"
        value={stats.totalNotices}
        icon={<Megaphone className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Active Notices"
        value={stats.activeNotices}
        icon={<AlertCircle className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="Archived Announcements"
        value={stats.archivedNotices}
        icon={<FileLock className="h-10 w-10 text-red-500" />}
        color="text-red-500"
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
