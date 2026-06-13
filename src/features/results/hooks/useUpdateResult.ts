"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateResultData {
  marksObtained?: number;
  grade?: string;
  remarks?: string;
}

export function useUpdateResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateResultData }) => {
      const response = await fetch(`/api/results/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to update result");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
      queryClient.invalidateQueries({ queryKey: ["result", variables.id] });
    },
  });
}
