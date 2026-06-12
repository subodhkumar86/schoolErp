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

export default function ResultsTable() {
  const { data: response } = useExams({ status: "Completed" });
  const exams = response?.data ?? [];

  return (
    <div className="rounded-3xl border bg-card p-4">
      <h2 className="mb-4 text-xl font-semibold">Completed Exams</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Exam Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Total Marks</TableHead>
            <TableHead>Passing Marks</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {exams.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <EmptyState
                  title="No Completed Exams"
                  description="Completed exams will appear here."
                />
              </TableCell>
            </TableRow>
          ) : (
            exams.map((exam) => (
              <TableRow key={exam._id as string}>
                <TableCell>{exam.name as string}</TableCell>
                <TableCell>{exam.subject as string}</TableCell>
                <TableCell>{exam.className as string}</TableCell>
                <TableCell>{exam.totalMarks as number}</TableCell>
                <TableCell>{exam.passingMarks as number}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
