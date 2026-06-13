"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useExams } from "../hooks/useExams";
import { useDeleteExam } from "../hooks/useDeleteExam";
import type { ExamType } from "../types/exam";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import ExamFilters from "./ExamFilters";

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

export default function ExamsTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 10;
  const { data: response, isLoading } = useExams({
    search,
    class: selectedClass,
    status: selectedStatus,
    page: currentPage,
    limit,
  });

  const exams = (response?.data ?? []) as unknown as ExamType[];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const deleteExamMutation = useDeleteExam();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteExamMutation.mutateAsync(deleteId);
      toast.success("Exam deleted successfully");
      setDeleteId(null);
      if (exams.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete exam");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <ExamFilters
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
        selectedStatus={selectedStatus}
        setSelectedStatus={(v) => {
          setSelectedStatus(v);
          setCurrentPage(1);
        }}
      />

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Passing / Total Marks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {exams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <EmptyState
                      title="No Exams Found"
                      description="Try changing your filters or schedule a new exam."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                exams.map((exam) => (
                  <TableRow key={exam._id}>
                    <TableCell className="font-semibold">{exam.name}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>
                      {exam.className}
                      {exam.section ? ` - ${exam.section}` : ""}
                    </TableCell>
                    <TableCell>
                      {new Date(exam.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{exam.duration} mins</TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">
                        {exam.passingMarks}
                      </span>{" "}
                      / {exam.totalMarks}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          exam.status === "Scheduled"
                            ? "bg-orange-500/20 text-orange-600"
                            : exam.status === "Ongoing"
                              ? "bg-blue-500/20 text-blue-600"
                              : exam.status === "Completed"
                                ? "bg-green-500/20 text-green-600"
                                : "bg-red-500/20 text-red-600"
                        }`}
                      >
                        {exam.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/exams/${exam._id}`)}
                          title="View"
                        >
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/exams/${exam._id}/edit`)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                          onClick={() => setDeleteId(exam._id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
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
            <DialogTitle>Delete Exam</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this exam schedule? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteExamMutation.isPending}
            >
              {deleteExamMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
