"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Record<string, unknown>;
    }) => {
      const response = await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      return response.json();
    },

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      queryClient.invalidateQueries({
        queryKey: ["student", variables.id],
      });
    },
  });
}
