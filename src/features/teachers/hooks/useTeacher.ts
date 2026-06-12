"use client";

import { useQuery } from "@tanstack/react-query";

export function useTeacher(id: string) {
  return useQuery({
    queryKey: ["teacher", id],

    queryFn: async () => {
      const response = await fetch(`/api/teachers/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch teacher");
      }

      return response.json();
    },

    enabled: !!id,
  });
}
