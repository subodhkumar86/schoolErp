"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateExamData {
  name?: string;
  subject?: string;
  className?: string;
  section?: string;
  date?: string;
  duration?: number;
  totalMarks?: number;
  passingMarks?: number;
  status?: "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
  description?: string;
}

export function useUpdateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateExamData }) => {
      const response = await fetch(`/api/exams/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update exam");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.invalidateQueries({ queryKey: ["exam", variables.id] });
    },
  });
}
