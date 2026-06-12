"use client";

import { useQuery } from "@tanstack/react-query";

export function useStudent(id: string) {
  return useQuery({
    queryKey: ["student", id],

    queryFn: async () => {
      const response = await fetch(`/api/students/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch student");
      }

      return response.json();
    },

    enabled: !!id,
  });
}
