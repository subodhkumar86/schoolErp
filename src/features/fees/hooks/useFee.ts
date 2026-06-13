"use client";

import { useQuery } from "@tanstack/react-query";
import type { FeeType } from "../types/fee";

export function useFee(id: string) {
  return useQuery<FeeType>({
    queryKey: ["fee", id],
    queryFn: async () => {
      const response = await fetch(`/api/fees/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch fee record details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
