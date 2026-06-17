"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTeachers } from "../hooks/useTeachers";
import { useDeleteTeacher } from "../hooks/useDeleteTeacher";
import type { Teacher } from "../types/teacher";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import TeacherFilters from "./TeacherFilters";

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

export default function TeachersTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: response, isLoading } = useTeachers({
    search,
    department: selectedDepartment,
    status: selectedStatus,
    page: currentPage,
    limit: 10,
  });

  const teachers: Teacher[] = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / 10);

  const deleteTeacher = useDeleteTeacher();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteTeacher.mutateAsync(deleteId);
      toast.success("Teacher deleted successfully");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete teacher");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <TeacherFilters
        search={search}
        setSearch={(v) => { setSearch(v); setCurrentPage(1); }}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={(v) => { setSelectedDepartment(v); setCurrentPage(1); }}
        selectedStatus={selectedStatus}
        setSelectedStatus={(v) => { setSelectedStatus(v); setCurrentPage(1); }}
      />

      <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
        <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-900">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-900 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Teacher</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Employee ID</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Department</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Experience</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Status</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 text-right p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <EmptyState
                      title="No Teachers Found"
                      description="Try changing your filters or add a new teacher."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((teacher) => (
                  <TableRow
                    key={teacher._id}
                    className="border-b border-slate-100 dark:border-slate-900 last:border-0 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                  >
                    <TableCell className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-sm shadow-indigo-500/10">
                          {teacher.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-850 dark:text-slate-200">{teacher.name}</p>
                          <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">
                            {teacher.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">{teacher.employeeId}</TableCell>

                    <TableCell className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">{teacher.department}</TableCell>

                    <TableCell className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-250">
                      {teacher.experience ?? 0} yrs
                    </TableCell>

                    <TableCell className="p-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          teacher.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : teacher.status === "On Leave"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-450"
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </TableCell>

                    <TableCell className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/teachers/${teacher._id}`)}
                          title="View"
                          className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(`/teachers/${teacher._id}/edit`)
                          }
                          title="Edit"
                          className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <Pencil className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-350"
                          onClick={() => setDeleteId(teacher._id)}
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          prevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        />
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="rounded-3xl border border-slate-200/50 bg-white/95 dark:border-slate-800/50 dark:bg-slate-950/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-50">Delete Teacher</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              This action cannot be undone. Are you sure you want to delete this teacher?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              className="rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteTeacher.isPending}
              className="rounded-2xl"
            >
              {deleteTeacher.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
