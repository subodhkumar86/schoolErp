"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateClassData {
  name?: string;
  section?: string;
  classTeacher?: string;
  capacity?: number;
  subjects?: string[];
  status?: "Active" | "Inactive";
}

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateClassData }) => {
      const response = await fetch(`/api/classes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update class");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      queryClient.invalidateQueries({ queryKey: ["class", variables.id] });
    },
  });
}
