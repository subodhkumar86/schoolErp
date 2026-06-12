"use client";

import EmptyState from "@/components/shared/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useExams } from "../hooks/useExams";

export default function ExamScheduleTable() {
  const { data: response } = useExams({ status: "Scheduled" });
  const exams = response?.data ?? [];

  return (
    <div className="rounded-3xl border bg-card p-4">
      <h2 className="mb-4 text-xl font-semibold">Upcoming Exams</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Exam Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {exams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <EmptyState
                  title="No Exams Scheduled"
                  description="Create an exam to get started."
                />
              </TableCell>
            </TableRow>
          ) : (
            exams.map((exam) => (
              <TableRow key={exam._id as string}>
                <TableCell>{exam.name as string}</TableCell>
                <TableCell>{exam.subject as string}</TableCell>
                <TableCell>{exam.className as string}</TableCell>
                <TableCell>
                  {new Date(exam.date as string).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-500">
                    {exam.status as string}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
