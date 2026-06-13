"use client";

import { useQuery } from "@tanstack/react-query";
import type { ResultType } from "../types/result";

export function useResult(id: string) {
  return useQuery<ResultType>({
    queryKey: ["result", id],
    queryFn: async () => {
      const response = await fetch(`/api/results/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch result record");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
