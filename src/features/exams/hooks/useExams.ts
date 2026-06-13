"use client";

import { useQuery } from "@tanstack/react-query";

interface ExamsResponse {
  data: Record<string, unknown>[];
  total: number;
}

export function useExams(params?: {
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

  return useQuery<ExamsResponse>({
    queryKey: ["exams", params],
    queryFn: async () => {
      const response = await fetch(`/api/exams?${searchParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch exams");
      return response.json();
    },
  });
}
