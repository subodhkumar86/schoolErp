"use client";

import { useQuery } from "@tanstack/react-query";
import type { InventoryType } from "../types/inventory";

interface InventoriesResponse {
  data: InventoryType[];
  total: number;
  stats: {
    totalAssets: number;
    activeAssets: number;
    maintenanceAssets: number;
    retiredAssets: number;
  };
  page: number;
  limit: number;
}

export function useInventories(params?: {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.category) searchParams.set("category", params.category);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<InventoriesResponse>({
    queryKey: ["inventories", params],
    queryFn: async () => {
      const response = await fetch(`/api/inventory?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch inventory assets");
      }
      return response.json();
    },
  });
}
