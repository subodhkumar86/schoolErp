"use client";

import { useQuery } from "@tanstack/react-query";
import type { HomeworkType } from "../types/homework";

export function useHomework(id: string) {
  return useQuery<HomeworkType>({
    queryKey: ["homework", id],
    queryFn: async () => {
      const response = await fetch(`/api/homework/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch homework details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
