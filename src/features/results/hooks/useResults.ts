"use client";

import { useQuery } from "@tanstack/react-query";
import type { ResultType } from "../types/result";

interface ResultsResponse {
  data: ResultType[];
  total: number;
  page: number;
  limit: number;
}

export function useResults(params?: {
  search?: string;
  class?: string;
  examId?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.class) searchParams.set("class", params.class);
  if (params?.examId) searchParams.set("examId", params.examId);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<ResultsResponse>({
    queryKey: ["results", params],
    queryFn: async () => {
      const response = await fetch(`/api/results?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      return response.json();
    },
  });
}
