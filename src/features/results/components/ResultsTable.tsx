"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResults } from "../hooks/useResults";
import { useDeleteResult } from "../hooks/useDeleteResult";
import type { ResultType } from "../types/result";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import ResultFilters from "./ResultFilters";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ResultsTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 10;
  const { data: response, isLoading } = useResults({
    search,
    class: selectedClass,
    examId: selectedExam,
    page: currentPage,
    limit,
  });

  const results = (response?.data ?? []) as unknown as ResultType[];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const deleteResultMutation = useDeleteResult();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteResultMutation.mutateAsync(deleteId);
      toast.success("Result record deleted successfully");
      setDeleteId(null);
      if (results.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete result record");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <ResultFilters
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        selectedClass={selectedClass}
        setSelectedClass={(v) => {
          setSelectedClass(v);
          setCurrentPage(1);
        }}
        selectedExam={selectedExam}
        setSelectedExam={(v) => {
          setSelectedExam(v);
          setCurrentPage(1);
        }}
      />

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Marks Obtained</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {results.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9}>
                    <EmptyState
                      title="No Results Recorded"
                      description="Enter student exam grades to populate this table."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                results.map((r) => {
                  const student =
                    typeof r.studentId === "object" ? r.studentId : null;
                  const exam = typeof r.examId === "object" ? r.examId : null;

                  const isPassed =
                    student && exam
                      ? r.marksObtained >= exam.passingMarks
                      : false;

                  return (
                    <TableRow key={r._id}>
                      <TableCell className="font-semibold">
                        {student?.name ?? "—"}
                      </TableCell>
                      <TableCell>{student?.rollNumber ?? "—"}</TableCell>
                      <TableCell>
                        {student?.studentClass ?? "—"}
                        {student?.section ? ` - ${student.section}` : ""}
                      </TableCell>
                      <TableCell>{exam?.name ?? "—"}</TableCell>
                      <TableCell>{exam?.subject ?? "—"}</TableCell>
                      <TableCell>
                        <span className="font-medium">{r.marksObtained}</span> /{" "}
                        {exam?.totalMarks ?? "—"}
                      </TableCell>
                      <TableCell>
                        <span className="rounded bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                          {r.grade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            isPassed
                              ? "bg-green-500/20 text-green-600"
                              : "bg-red-500/20 text-red-600"
                          }`}
                        >
                          {isPassed ? "Pass" : "Fail"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/results/${r._id}`)}
                            title="View"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              router.push(`/results/${r._id}/edit`)
                            }
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                            onClick={() => setDeleteId(r._id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              nextPage={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              prevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            />
          </div>
        )}
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Result Record</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this result? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteResultMutation.isPending}
            >
              {deleteResultMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
