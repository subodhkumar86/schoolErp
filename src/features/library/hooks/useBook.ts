"use client";

import { useQuery } from "@tanstack/react-query";
import type { BookType } from "../types/book";

export function useBook(id: string) {
  return useQuery<BookType>({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
