"use client";

import { Input } from "@/components/ui/input";

interface StudentsFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  selectedClass: string;
  setSelectedClass: (value: string) => void;

  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

export default function StudentsFilters({
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
  selectedStatus,
  setSelectedStatus,
}: StudentsFiltersProps) {
  return (
    <div className="rounded-3xl border bg-card p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="h-10 rounded-md border bg-background px-3"
        >
          <option value="">All Classes</option>

          <option value="10-A">10-A</option>

          <option value="10-B">10-B</option>

          <option value="9-A">9-A</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-10 rounded-md border bg-background px-3"
        >
          <option value="">All Status</option>

          <option value="Active">Active</option>

          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}
