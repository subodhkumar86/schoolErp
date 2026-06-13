"use client";

import { Input } from "@/components/ui/input";
import { useClasses } from "@/features/classes/hooks/useClasses";
import { useExams } from "@/features/exams/hooks/useExams";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedExam: string;
  setSelectedExam: (value: string) => void;
}

export default function ResultFilters({
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
  selectedExam,
  setSelectedExam,
}: Props) {
  const { data: classesRes } = useClasses({ limit: 1000 });
  const { data: examsRes } = useExams({ limit: 1000 });

  const classes = classesRes?.data ?? [];
  const exams = examsRes?.data ?? [];

  const uniqueClassNames = Array.from(
    new Set(classes.map((c) => c.name)),
  ).sort();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Input
        placeholder="Search students by name..."
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
        value={selectedExam}
        onChange={(e) => setSelectedExam(e.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
      >
        <option value="">All Exams</option>
        {exams.map((exam) => (
          <option key={exam._id as string} value={exam._id as string}>
            {exam.name as string} ({exam.subject as string})
          </option>
        ))}
      </select>
    </div>
  );
}
