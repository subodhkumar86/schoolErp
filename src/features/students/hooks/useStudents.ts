"use client";

import { useQuery } from "@tanstack/react-query";
import type { Student } from "../types/student";

interface StudentsResponse {
  data: Student[];
  total: number;
  page: number;
  limit: number;
}

export function useStudents(params?: {
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

  return useQuery<StudentsResponse>({
    queryKey: ["students", params],

    queryFn: async () => {
      const response = await fetch(`/api/students?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      return response.json();
    },
  });
}
