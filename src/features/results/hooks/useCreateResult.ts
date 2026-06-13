"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateResultData {
  studentId: string;
  examId: string;
  marksObtained: number;
  grade?: string;
  remarks?: string;
}

export function useCreateResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateResultData) => {
      const response = await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to create result");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
    },
  });
}
