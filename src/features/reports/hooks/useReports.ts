"use client";

import { useQuery } from "@tanstack/react-query";

interface ReportsResponse {
  stats: {
    attendanceRate: string;
    feeCollection: string;
    examAverage: string;
    activeStudents: number;
  };
  attendanceReport: { month: string; attendance: string }[];
  feeReport: { month: string; revenue: string }[];
  examReport: { exam: string; average: string }[];
  studentReport: { className: string; count: number }[];
  teacherReport: { department: string; count: number }[];
}

export function useReports() {
  return useQuery<ReportsResponse>({
    queryKey: ["reports"],
    queryFn: async () => {
      const response = await fetch("/api/reports");
      if (!response.ok) {
        throw new Error("Failed to fetch reports and analytics");
      }
      return response.json();
    },
  });
}
