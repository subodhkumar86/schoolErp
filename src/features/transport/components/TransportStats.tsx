"use client";

import { Map, Bus, Wrench, Users } from "lucide-react";
import type { ReactNode } from "react";
import { useTransports } from "../hooks/useTransports";

export default function TransportStats() {
  const { data: response } = useTransports({ limit: 1 });
  const stats = response?.stats || {
    totalRoutes: 0,
    activeVehicles: 0,
    maintenanceVehicles: 0,
    totalCapacity: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Route Paths"
        value={stats.totalRoutes}
        icon={<Map className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Active Vehicles"
        value={stats.activeVehicles}
        icon={<Bus className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="Vehicles in Maintenance"
        value={stats.maintenanceVehicles}
        icon={<Wrench className="h-10 w-10 text-orange-500" />}
        color="text-orange-500"
      />

      <StatCard
        title="Total Capacity Seats"
        value={`${stats.totalCapacity} seats`}
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
          <h3 className={`mt-2 text-2xl font-bold ${color}`}>{value}</h3>
        </div>
        {icon}
      </div>
    </div>
  );
}
