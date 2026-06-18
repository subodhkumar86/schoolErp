"use client";

import { useQuery } from "@tanstack/react-query";
import type { SubjectType } from "../types/subject";

interface SubjectsResponse {
  data: SubjectType[];
  total: number;
  page: number;
  limit: number;
}

export function useSubjects(params?: {
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.type) searchParams.set("type", params.type);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<SubjectsResponse>({
    queryKey: ["subjects", params],
    queryFn: async () => {
      const response = await fetch(`/api/subjects?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      return response.json();
    },
  });
}
