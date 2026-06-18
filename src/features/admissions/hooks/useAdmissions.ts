"use client";

import { useQuery } from "@tanstack/react-query";
import type { Admission } from "../types/admission";

interface AdmissionsResponse {
  data: Admission[];
  total: number;
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  page: number;
  limit: number;
}

export function useAdmissions(params?: {
  search?: string;
  class?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.class) searchParams.set("class", params.class);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<AdmissionsResponse>({
    queryKey: ["admissions", params],
    queryFn: async () => {
      const response = await fetch(`/api/admissions?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch admissions");
      }
      return response.json();
    },
  });
}
