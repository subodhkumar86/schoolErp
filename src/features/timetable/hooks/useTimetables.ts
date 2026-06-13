"use client";

import { useQuery } from "@tanstack/react-query";
import type { TimetableSlotType } from "../types/timetable";

interface TimetablesResponse {
  data: TimetableSlotType[];
  total: number;
  stats: {
    totalSlots: number;
    classesScheduled: number;
    teachersAssigned: number;
  };
  page: number;
  limit: number;
}

export function useTimetables(params?: {
  search?: string;
  classId?: string;
  teacherId?: string;
  dayOfWeek?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.classId) searchParams.set("classId", params.classId);
  if (params?.teacherId) searchParams.set("teacherId", params.teacherId);
  if (params?.dayOfWeek) searchParams.set("dayOfWeek", params.dayOfWeek);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<TimetablesResponse>({
    queryKey: ["timetables", params],
    queryFn: async () => {
      const response = await fetch(`/api/timetable?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch timetable slots");
      }
      return response.json();
    },
  });
}
