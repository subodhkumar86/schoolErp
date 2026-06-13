"use client";

import { useQuery } from "@tanstack/react-query";
import type { ClassType } from "../types/class";

export function useClass(id: string) {
  return useQuery<ClassType>({
    queryKey: ["class", id],
    queryFn: async () => {
      const response = await fetch(`/api/classes/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch class");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
