"use client";

import { useQuery } from "@tanstack/react-query";
import type { Admission } from "../types/admission";

export function useAdmission(id: string) {
  return useQuery<Admission>({
    queryKey: ["admissions", id],
    queryFn: async () => {
      if (!id) throw new Error("Admission ID is required");
      const response = await fetch(`/api/admissions/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch admission application details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
