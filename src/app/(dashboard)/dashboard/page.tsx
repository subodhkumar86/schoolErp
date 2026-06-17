"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/features/auth/hooks/useMe";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { Loader2 } from "lucide-react";

import {
  SuperAdminDashboard,
  TeacherDashboard,
  StudentDashboard,
  ParentDashboard,
  AccountantDashboard,
  LibrarianDashboard,
} from "@/components/dashboard/roles/DashboardRoles";

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

function formatCurrency(amount: number) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useMe();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const role = user?.role;

  useEffect(() => {
    if (!authLoading && !statsLoading && role === "Admin" && stats) {
      if ((stats.totalStudents ?? 0) === 0 && (stats.totalTeachers ?? 0) === 0) {
        router.push("/setup");
      }
    }
  }, [role, stats, authLoading, statsLoading, router]);

  if (authLoading || statsLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <span>Loading your portal dashboard...</span>
      </div>
    );
  }

  if (role === "Super Admin") {
    return <SuperAdminDashboard stats={stats} />;
  }

  if (role === "Teacher") {
    return <TeacherDashboard stats={stats} />;
  }

  if (role === "Student") {
    return <StudentDashboard stats={stats} />;
  }

  if (role === "Parent") {
    return <ParentDashboard stats={stats} />;
  }

  if (role === "Accountant") {
    return <AccountantDashboard stats={stats} />;
  }

  if (role === "Librarian") {
    return <LibrarianDashboard stats={stats} />;
  }

  // Fallback to School Admin Dashboard
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
