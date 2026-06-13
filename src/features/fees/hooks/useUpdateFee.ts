"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FeeFormValues } from "../schemas/feeSchema";

export function useUpdateFee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<FeeFormValues> }) => {
      const response = await fetch(`/api/fees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update fee record");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["fees"] });
      queryClient.invalidateQueries({ queryKey: ["fee", variables.id] });
    },
  });
}
