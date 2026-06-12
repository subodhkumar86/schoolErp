"use client";

import { useQuery } from "@tanstack/react-query";

export function useTeacherAttendance() {
  return useQuery({
    queryKey: ["teacher-attendance"],

    queryFn: async () => {
      const response = await fetch("/api/attendance?type=teacher");

      if (!response.ok) {
        throw new Error("Failed to fetch teacher attendance");
      }

      return response.json();
    },
  });
}
