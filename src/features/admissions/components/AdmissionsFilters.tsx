"use client";

import { Input } from "@/components/ui/input";

interface AdmissionsFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

export default function AdmissionsFilters({
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
  selectedStatus,
  setSelectedStatus,
}: AdmissionsFiltersProps) {
  return (
    <div className="rounded-3xl border bg-card p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Search by student or parent name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 focus:outline-none"
        >
          <option value="">All Applied Classes</option>
          <option value="Class 9">Class 9</option>
          <option value="Class 10-A">Class 10-A</option>
          <option value="Class 10-B">Class 10-B</option>
          <option value="Class 11-A">Class 11-A</option>
          <option value="Class 12-A">Class 12-A</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-10 rounded-md border bg-background px-3 focus:outline-none"
        >
          <option value="">All Application Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
}
