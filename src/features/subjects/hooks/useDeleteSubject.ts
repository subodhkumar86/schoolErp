"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteSubject() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`/api/subjects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to delete subject");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}
