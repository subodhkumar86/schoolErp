"use client";

import { useQuery } from "@tanstack/react-query";
import type { NotificationType } from "../types/notification";

interface NotificationsResponse {
  data: NotificationType[];
  total: number;
  stats: {
    totalNotifications: number;
    unreadNotifications: number;
    importantNotifications: number;
  };
  page: number;
  limit: number;
}

export function useNotifications(params?: {
  search?: string;
  type?: string;
  recipient?: string;
  read?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.type) searchParams.set("type", params.type);
  if (params?.recipient) searchParams.set("recipient", params.recipient);
  if (params?.read) searchParams.set("read", params.read);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<NotificationsResponse>({
    queryKey: ["notifications", params],
    queryFn: async () => {
      const response = await fetch(`/api/notifications?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      return response.json();
    },
  });
}
