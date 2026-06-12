"use client";

import { Input } from "@/components/ui/input";

import TeacherSearch from "./TeacherSearch";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;

  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

export default function TeacherFilters({
  search,
  setSearch,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <TeacherSearch value={search} onChange={setSearch} />

      <Input
        placeholder="Department"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      />

      <Input
        placeholder="Status"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      />
    </div>
  );
}
