"use client";

import { useQuery } from "@tanstack/react-query";
import type { SubjectType } from "../types/subject";

export function useSubject(id: string) {
  return useQuery<SubjectType>({
    queryKey: ["subject", id],
    queryFn: async () => {
      const response = await fetch(`/api/subjects/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch subject details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
