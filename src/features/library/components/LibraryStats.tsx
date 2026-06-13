"use client";

import { BookOpen, BookmarkCheck, FileMinus, AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import { useBooks } from "../hooks/useBooks";

export default function LibraryStats() {
  const { data: response } = useBooks({ limit: 1 });
  const stats = response?.stats || {
    totalTitles: 0,
    totalBooks: 0,
    availableBooks: 0,
    issuedBooks: 0,
    outOfStock: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Books (Copies)"
        value={`${stats.totalBooks} (${stats.totalTitles} titles)`}
        icon={<BookOpen className="h-10 w-10 text-primary" />}
        color=""
      />

      <StatCard
        title="Available Copies"
        value={stats.availableBooks}
        icon={<BookmarkCheck className="h-10 w-10 text-green-500" />}
        color="text-green-500"
      />

      <StatCard
        title="Issued Copies"
        value={stats.issuedBooks}
        icon={<FileMinus className="h-10 w-10 text-orange-500" />}
        color="text-orange-500"
      />

      <StatCard
        title="Titles Out of Stock"
        value={stats.outOfStock}
        icon={<AlertTriangle className="h-10 w-10 text-red-500" />}
        color="text-red-500"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className={`mt-2 text-2xl font-bold ${color}`}>{value}</h3>
        </div>
        {icon}
      </div>
    </div>
  );
}
