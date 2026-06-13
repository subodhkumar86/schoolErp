"use client";

import { useQuery } from "@tanstack/react-query";
import type { ExamType } from "../types/exam";

export function useExam(id: string) {
  return useQuery<ExamType>({
    queryKey: ["exam", id],
    queryFn: async () => {
      const response = await fetch(`/api/exams/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch exam");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
