"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Record<string, unknown>;
    }) => {
      const response = await fetch(`/api/teachers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update teacher");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
  });
}
