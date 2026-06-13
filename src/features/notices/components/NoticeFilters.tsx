"use client";

import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  selectedAudience: string;
  setSelectedAudience: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

export default function NoticeFilters({
  search,
  setSearch,
  selectedAudience,
  setSelectedAudience,
  selectedStatus,
  setSelectedStatus,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Input
        placeholder="Search by title, content, or creator..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      <select
        value={selectedAudience}
        onChange={(e) => setSelectedAudience(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Audiences</option>
        <option value="All">General/All</option>
        <option value="Students">Students</option>
        <option value="Teachers">Teachers</option>
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Archived">Archived</option>
      </select>
    </div>
  );
}
