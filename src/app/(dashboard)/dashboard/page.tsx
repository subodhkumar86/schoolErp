"use client";

import {
  GraduationCap,
  Users,
  DollarSign,
  CalendarCheck,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentStudents from "@/components/dashboard/RecentStudents";

import StudentGrowthChart from "@/components/charts/StudentGrowthChart";
import AttendanceChart from "@/components/charts/AttendanceChart";
import RevenueChart from "@/components/charts/RevenueChart";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import FeeCollectionCard from "@/components/dashboard/FeeCollectionCard";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";

function formatCurrency(amount: number) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

export default function DashboardPage() {
  const { data: stats } = useDashboardStats();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <DashboardHeader />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={stats?.totalStudents?.toLocaleString() ?? "—"}
          description={`${stats?.activeStudents ?? 0} active`}
          icon={<GraduationCap size={22} />}
        />

        <StatsCard
          title="Total Teachers"
          value={stats?.totalTeachers?.toLocaleString() ?? "—"}
          description={`${stats?.activeTeachers ?? 0} active`}
          icon={<Users size={22} />}
        />

        <StatsCard
          title="Today Present"
          value={stats?.todayAttendance?.toLocaleString() ?? "—"}
          description="Students present today"
          icon={<CalendarCheck size={22} />}
        />

        <StatsCard
          title="Revenue"
          value={stats ? formatCurrency(stats.totalRevenue) : "—"}
          description={`${stats ? formatCurrency(stats.pendingFees) : "—"} pending`}
          icon={<DollarSign size={22} />}
        />
      </div>

      {/* Fee Collection */}
      <FeeCollectionCard />

      {/* Main Chart */}
      <StudentGrowthChart />

      {/* Secondary Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AttendanceChart />
        <RevenueChart />
      </div>

      {/* Activity + Events */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ActivityTimeline />
        <UpcomingEvents />
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentStudents />
        <QuickActions />
      </div>
    </div>
  );
}
