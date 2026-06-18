"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubjectType } from "../types/subject";

export function useCreateSubject() {
  const queryClient = useQueryClient();

  return useMutation<
    SubjectType,
    Error,
    Omit<SubjectType, "_id" | "schoolId" | "createdAt" | "updatedAt">
  >({
    mutationFn: async (newSubject) => {
      const response = await fetch("/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubject),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to create subject");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}
