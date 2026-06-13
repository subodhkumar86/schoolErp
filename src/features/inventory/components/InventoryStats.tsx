"use client";

import { Package, ShieldCheck, Wrench, Trash } from "lucide-react";
import type { ReactNode } from "react";
import { useInventories } from "../hooks/useInventories";

export default function InventoryStats() {
  const { data: response } = useInventories({ limit: 1 });
  const stats = response?.stats || {
    totalAssets: 0,
    activeAssets: 0,
    maintenanceAssets: 0,
    retiredAssets: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Asset Copies"
        value={stats.totalAssets}
        icon={<Package className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Active Assets"
        value={stats.activeAssets}
        icon={<ShieldCheck className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="In Maintenance"
        value={stats.maintenanceAssets}
        icon={<Wrench className="h-10 w-10 text-orange-500" />}
        color="text-orange-500"
      />

      <StatCard
        title="Retired / Scrapped"
        value={stats.retiredAssets}
        icon={<Trash className="h-10 w-10 text-red-500" />}
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
