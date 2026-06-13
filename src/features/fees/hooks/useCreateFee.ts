"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FeeFormValues } from "../schemas/feeSchema";

export function useCreateFee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FeeFormValues) => {
      const response = await fetch("/api/fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create fee record");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fees"] });
    },
  });
}
