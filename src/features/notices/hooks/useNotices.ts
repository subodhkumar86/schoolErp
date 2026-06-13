"use client";

import { useQuery } from "@tanstack/react-query";
import type { NoticeType } from "../types/notice";

interface NoticesResponse {
  data: NoticeType[];
  total: number;
  stats: {
    totalNotices: number;
    activeNotices: number;
    archivedNotices: number;
  };
  page: number;
  limit: number;
}

export function useNotices(params?: {
  search?: string;
  audience?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.audience) searchParams.set("audience", params.audience);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<NoticesResponse>({
    queryKey: ["notices", params],
    queryFn: async () => {
      const response = await fetch(`/api/notices?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notices");
      }
      return response.json();
    },
  });
}
