"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TransportFormValues } from "../schemas/transportSchema";

export function useUpdateTransport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TransportFormValues> }) => {
      const response = await fetch(`/api/transport/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update transport route details");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["transports"] });
      queryClient.invalidateQueries({ queryKey: ["transport", variables.id] });
    },
  });
}
