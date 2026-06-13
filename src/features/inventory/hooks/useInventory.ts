"use client";

import { useQuery } from "@tanstack/react-query";
import type { InventoryType } from "../types/inventory";

export function useInventory(id: string) {
  return useQuery<InventoryType>({
    queryKey: ["inventory", id],
    queryFn: async () => {
      const response = await fetch(`/api/inventory/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch asset details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
