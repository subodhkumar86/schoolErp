"use client";

import { Bell, EyeOff, AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationStats() {
  const { data: response } = useNotifications({ limit: 1 });
  const stats = response?.stats || {
    totalNotifications: 0,
    unreadNotifications: 0,
    importantNotifications: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Notifications"
        value={stats.totalNotifications}
        icon={<Bell className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Unread alerts"
        value={stats.unreadNotifications}
        icon={<EyeOff className="h-10 w-10 text-orange-500" />}
        color="text-orange-500"
      />

      <StatCard
        title="High Priority"
        value={stats.importantNotifications}
        icon={<AlertTriangle className="h-10 w-10 text-red-500" />}
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
