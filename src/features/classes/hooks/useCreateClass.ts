"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateClassData {
  name: string;
  section: string;
  classTeacher?: string;
  capacity?: number;
  subjects?: string[];
  status?: "Active" | "Inactive";
}

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateClassData) => {
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create class");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
}
