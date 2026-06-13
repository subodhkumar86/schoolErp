"use client";

import { useQuery } from "@tanstack/react-query";
import type { NoticeType } from "../types/notice";

export function useNotice(id: string) {
  return useQuery<NoticeType>({
    queryKey: ["notice", id],
    queryFn: async () => {
      const response = await fetch(`/api/notices/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notice details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
