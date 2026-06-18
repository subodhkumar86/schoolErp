"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubjectType } from "../types/subject";

export function useUpdateSubject(id: string) {
  const queryClient = useQueryClient();

  return useMutation<
    SubjectType,
    Error,
    Omit<SubjectType, "_id" | "schoolId" | "createdAt" | "updatedAt">
  >({
    mutationFn: async (updatedSubject) => {
      const response = await fetch(`/api/subjects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSubject),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to update subject");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      queryClient.invalidateQueries({ queryKey: ["subject", id] });
    },
  });
}
