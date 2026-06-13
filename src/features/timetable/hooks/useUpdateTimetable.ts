"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TimetableFormValues } from "../schemas/timetableSchema";

export function useUpdateTimetable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TimetableFormValues> }) => {
      const response = await fetch(`/api/timetable/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update timetable slot");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["timetables"] });
      queryClient.invalidateQueries({ queryKey: ["timetable", variables.id] });
    },
  });
}
