"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateHomeworkData {
  title?: string;
  description?: string;
  className?: string;
  section?: string;
  subject?: string;
  dueDate?: string;
  status?: "Active" | "Closed";
  teacherId?: string;
  maxPoints?: number;
}

export function useUpdateHomework() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateHomeworkData }) => {
      const response = await fetch(`/api/homework/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update homework assignment");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["homeworks"] });
      queryClient.invalidateQueries({ queryKey: ["homework", variables.id] });
    },
  });
}
