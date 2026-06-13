"use client";

import { useQuery } from "@tanstack/react-query";
import type { AttendanceRecord } from "../types/attendance";

interface AttendanceResponse {
  data: AttendanceRecord[];
  total: number;
  page: number;
  limit: number;
}

export function useAttendances(params?: {
  type?: "Student" | "Teacher";
  date?: string;
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  studentClass?: string;
  department?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.type) searchParams.set("type", params.type);
  if (params?.date) searchParams.set("date", params.date);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  if (params?.studentClass) searchParams.set("studentClass", params.studentClass);
  if (params?.department) searchParams.set("department", params.department);

  return useQuery<AttendanceResponse>({
    queryKey: ["attendance", params],

    queryFn: async () => {
      const response = await fetch(`/api/attendance?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch attendance");
      }

      return response.json();
    },
  });
}
