"use client";

import { useQuery } from "@tanstack/react-query";

export function useAttendance(id: string) {
  return useQuery({
    queryKey: ["attendance", id],

    queryFn: async () => {
      const response = await fetch(`/api/attendance/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch attendance");
      }

      return response.json();
    },

    enabled: !!id,
  });
}
