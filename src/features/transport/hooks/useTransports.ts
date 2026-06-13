"use client";

import { useQuery } from "@tanstack/react-query";
import type { TransportType } from "../types/transport";

interface TransportsResponse {
  data: TransportType[];
  total: number;
  stats: {
    totalRoutes: number;
    activeVehicles: number;
    maintenanceVehicles: number;
    totalCapacity: number;
  };
  page: number;
  limit: number;
}

export function useTransports(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<TransportsResponse>({
    queryKey: ["transports", params],
    queryFn: async () => {
      const response = await fetch(`/api/transport?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch transport routes");
      }
      return response.json();
    },
  });
}
