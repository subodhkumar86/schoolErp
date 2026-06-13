"use client";

import { useQuery } from "@tanstack/react-query";
import type { ClassType } from "../types/class";

interface ClassesResponse {
  data: ClassType[];
  total: number;
  page: number;
  limit: number;
}

export function useClasses(params?: {
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

  return useQuery<ClassesResponse>({
    queryKey: ["classes", params],
    queryFn: async () => {
      const response = await fetch(`/api/classes?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch classes");
      }
      return response.json();
    },
  });
}
