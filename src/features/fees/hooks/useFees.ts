"use client";

import { useQuery } from "@tanstack/react-query";
import type { FeeType } from "../types/fee";

interface FeesResponse {
  data: FeeType[];
  total: number;
  stats: { _id: string; total: number; count: number }[];
}

export function useFees(params?: {
  status?: string;
  feeType?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set("status", params.status);
  if (params?.feeType) searchParams.set("feeType", params.feeType);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<FeesResponse>({
    queryKey: ["fees", params],
    queryFn: async () => {
      const response = await fetch(`/api/fees?${searchParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch fees");
      return response.json();
    },
  });
}

