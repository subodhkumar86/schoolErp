"use client";

import { useQuery } from "@tanstack/react-query";
import type { SettingType } from "../types/setting";

export function useSettings() {
  return useQuery<SettingType>({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await fetch("/api/settings");
      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }
      return response.json();
    },
  });
}
