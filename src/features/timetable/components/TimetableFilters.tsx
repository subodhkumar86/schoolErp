"use client";

import { Input } from "@/components/ui/input";
import { useClasses } from "@/features/classes/hooks/useClasses";
import { useTeachers } from "@/features/teachers/hooks/useTeachers";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedTeacher: string;
  setSelectedTeacher: (value: string) => void;
  selectedDay: string;
  setSelectedDay: (value: string) => void;
}

export default function TimetableFilters({
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
  selectedTeacher,
  setSelectedTeacher,
  selectedDay,
  setSelectedDay,
}: Props) {
  const { data: classesRes } = useClasses({ limit: 1000 });
  const { data: teachersRes } = useTeachers({ limit: 1000 });

  const classes = classesRes?.data ?? [];
  const teachers = teachersRes?.data ?? [];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Input
        placeholder="Search subject or classroom..."
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
        {classes.map((c) => (
          <option key={c._id} value={c._id}>
            Class {c.name}-{c.section}
          </option>
        ))}
      </select>

      <select
        value={selectedTeacher}
        onChange={(e) => setSelectedTeacher(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Teachers</option>
        {teachers.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>

      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Days</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
    </div>
  );
}
