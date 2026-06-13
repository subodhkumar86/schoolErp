"use client";

import { useQuery } from "@tanstack/react-query";
import type { TransportType } from "../types/transport";

export function useTransport(id: string) {
  return useQuery<TransportType>({
    queryKey: ["transport", id],
    queryFn: async () => {
      const response = await fetch(`/api/transport/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch transport route details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
