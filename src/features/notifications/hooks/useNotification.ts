"use client";

import { useQuery } from "@tanstack/react-query";
import type { NotificationType } from "../types/notification";

export function useNotification(id: string) {
  return useQuery<NotificationType>({
    queryKey: ["notification", id],
    queryFn: async () => {
      const response = await fetch(`/api/notifications/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notification details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
