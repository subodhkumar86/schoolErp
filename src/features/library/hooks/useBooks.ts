"use client";

import { useQuery } from "@tanstack/react-query";
import type { BookType } from "../types/book";

interface BooksResponse {
  data: BookType[];
  total: number;
  stats: {
    totalTitles: number;
    totalBooks: number;
    availableBooks: number;
    issuedBooks: number;
    outOfStock: number;
  };
  page: number;
  limit: number;
}

export function useBooks(params?: {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.category) searchParams.set("category", params.category);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return useQuery<BooksResponse>({
    queryKey: ["books", params],
    queryFn: async () => {
      const response = await fetch(`/api/books?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch library books");
      }
      return response.json();
    },
  });
}
