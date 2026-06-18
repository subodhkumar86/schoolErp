"use client";

import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
}

export default function SubjectsFilters({
  search,
  setSearch,
  selectedType,
  setSelectedType,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        placeholder="Search subjects by name or code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Types</option>
        <option value="Theory">Theory</option>
        <option value="Practical">Practical</option>
        <option value="Both">Both</option>
      </select>
    </div>
  );
}
