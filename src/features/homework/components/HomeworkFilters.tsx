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

export default function HomeworkFilters({
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
  selectedStatus,
  setSelectedStatus,
}: Props) {
  const { data: classesRes } = useClasses({ limit: 1000 });
  const classes = classesRes?.data ?? [];
  const uniqueClassNames = Array.from(
    new Set(classes.map((c) => c.name)),
  ).sort();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Input
        placeholder="Search assignments by title or subject..."
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
        <option value="Active">Active</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
