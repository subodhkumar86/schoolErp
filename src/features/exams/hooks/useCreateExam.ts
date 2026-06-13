"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateExamData {
  name: string;
  subject: string;
  className: string;
  section?: string;
  date: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  status?: "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
  description?: string;
}

export function useCreateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateExamData) => {
      const response = await fetch("/api/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create exam");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}
