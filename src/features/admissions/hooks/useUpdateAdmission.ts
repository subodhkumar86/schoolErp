"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAdmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
      const response = await fetch(`/api/admissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to update admission application");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admissions"],
      });
      // Invalidate students list in case status is Approved and student is created
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
}
