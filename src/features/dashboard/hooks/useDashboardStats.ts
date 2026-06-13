"use client";

import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  totalTeachers: number;
  activeTeachers: number;
  totalRevenue: number;
  pendingFees: number;
  todayAttendance: number;
  recentStudents: Array<{
    _id: string;
    name: string;
    studentClass: string;
    section: string;
  }>;
  recentNotices: Array<{
    _id: string;
    title: string;
    content: string;
    postedDate: string;
  }>;
  upcomingExams: Array<{
    _id: string;
    name: string;
    subject: string;
    className: string;
    date: string;
  }>;
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],

    queryFn: async () => {
      const response = await fetch("/api/dashboard/stats");

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }

      return response.json();
    },

    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
