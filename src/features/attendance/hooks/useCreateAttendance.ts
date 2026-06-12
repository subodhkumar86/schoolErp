"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const response = await fetch("/api/attendance", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create attendance");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
    },
  });
}
