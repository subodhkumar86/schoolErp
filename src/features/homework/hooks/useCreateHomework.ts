"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateHomeworkData {
  title: string;
  description: string;
  className: string;
  section?: string;
  subject: string;
  dueDate: string;
  status?: "Active" | "Closed";
  teacherId?: string;
  maxPoints?: number;
}

export function useCreateHomework() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateHomeworkData) => {
      const response = await fetch("/api/homework", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create homework assignment");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeworks"] });
    },
  });
}
