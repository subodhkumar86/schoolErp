"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TimetableFormValues } from "../schemas/timetableSchema";

export function useCreateTimetable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TimetableFormValues) => {
      const response = await fetch("/api/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create timetable slot");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timetables"] });
    },
  });
}
