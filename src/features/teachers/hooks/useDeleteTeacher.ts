"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/teachers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete teacher");
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
