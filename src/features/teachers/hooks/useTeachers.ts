"use client";

import { useQuery } from "@tanstack/react-query";
import type { Teacher } from "../types/teacher";

interface TeachersResponse {
  data: Teacher[];
  total: number;
  page: number;
  limit: number;
}

export function useTeachers(params?: {
  search?: string;
  department?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.department) searchParams.set("department", params.department);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<TeachersResponse>({
    queryKey: ["teachers", params],

    queryFn: async () => {
      const response = await fetch(`/api/teachers?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch teachers");
      }

      return response.json();
    },
  });
}
