"use client";

import { useQuery } from "@tanstack/react-query";
import type { TimetableSlotType } from "../types/timetable";

export function useTimetable(id: string) {
  return useQuery<TimetableSlotType>({
    queryKey: ["timetable", id],
    queryFn: async () => {
      const response = await fetch(`/api/timetable/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch timetable slot details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
