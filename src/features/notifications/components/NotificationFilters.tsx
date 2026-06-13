"use client";

import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedRecipient: string;
  setSelectedRecipient: (value: string) => void;
  selectedRead: string;
  setSelectedRead: (value: string) => void;
}

export default function NotificationFilters({
  search,
  setSearch,
  selectedType,
  setSelectedType,
  selectedRecipient,
  setSelectedRecipient,
  selectedRead,
  setSelectedRead,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Input
        placeholder="Search alerts..."
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
        <option value="Info">Info</option>
        <option value="Success">Success</option>
        <option value="Warning">Warning</option>
        <option value="Error">Error</option>
      </select>

      <select
        value={selectedRecipient}
        onChange={(e) => setSelectedRecipient(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Recipients</option>
        <option value="All">All Users</option>
        <option value="Students">Students Only</option>
        <option value="Teachers">Teachers Only</option>
      </select>

      <select
        value={selectedRead}
        onChange={(e) => setSelectedRead(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">Read & Unread</option>
        <option value="false">Unread Only</option>
        <option value="true">Read Only</option>
      </select>
    </div>
  );
}
