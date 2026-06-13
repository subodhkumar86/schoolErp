"use client";

import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  selectedFeeType: string;
  setSelectedFeeType: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

export default function FeeFilters({
  search,
  setSearch,
  selectedFeeType,
  setSelectedFeeType,
  selectedStatus,
  setSelectedStatus,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Input
        placeholder="Search by student name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      <select
        value={selectedFeeType}
        onChange={(e) => setSelectedFeeType(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Fee Types</option>
        <option value="Tuition">Tuition</option>
        <option value="Transport">Transport</option>
        <option value="Library">Library</option>
        <option value="Hostel">Hostel</option>
        <option value="Exam">Exam</option>
        <option value="Sports">Sports</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
        <option value="Overdue">Overdue</option>
        <option value="Partial">Partial</option>
      </select>
    </div>
  );
}
