"use client";

import { Input } from "@/components/ui/input";
import { useClasses } from "@/features/classes/hooks/useClasses";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

export default function ExamFilters({
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
  selectedStatus,
  setSelectedStatus,
}: Props) {
  const { data: classesRes } = useClasses({ limit: 1000 });
  const classes = classesRes?.data ?? [];

  // Get unique class names
  const uniqueClassNames = Array.from(new Set(classes.map((c) => c.name))).sort();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Input
        placeholder="Search exams by name or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Classes</option>
        {uniqueClassNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Statuses</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
}
