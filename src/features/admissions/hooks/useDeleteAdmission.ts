"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAdmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admissions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete admission application");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admissions"],
      });
    },
  });
}
