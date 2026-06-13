"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TransportFormValues } from "../schemas/transportSchema";

export function useCreateTransport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TransportFormValues) => {
      const response = await fetch("/api/transport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create transport route");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transports"] });
    },
  });
}
