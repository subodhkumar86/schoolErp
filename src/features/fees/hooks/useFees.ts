"use client";

import { useQuery } from "@tanstack/react-query";

interface FeesResponse {
  data: Record<string, unknown>[];
  total: number;
  stats: { _id: string; total: number; count: number }[];
}

export function useFees(params?: {
  status?: string;
  feeType?: string;
  page?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set("status", params.status);
  if (params?.feeType) searchParams.set("feeType", params.feeType);
  if (params?.page) searchParams.set("page", String(params.page));

  return useQuery<FeesResponse>({
    queryKey: ["fees", params],
    queryFn: async () => {
      const response = await fetch(`/api/fees?${searchParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch fees");
      return response.json();
    },
  });
}
