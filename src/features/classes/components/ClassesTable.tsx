"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClasses } from "../hooks/useClasses";
import { useDeleteClass } from "../hooks/useDeleteClass";
import type { ClassType } from "../types/class";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import ClassFilters from "./ClassFilters";

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

export default function ClassesTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 10;
  const { data: response, isLoading } = useClasses({
    search,
    status: selectedStatus,
    page: currentPage,
    limit,
  });

  const classes: ClassType[] = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const deleteClassMutation = useDeleteClass();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteClassMutation.mutateAsync(deleteId);
      toast.success("Class deleted successfully");
      setDeleteId(null);
      // Adjust page if we deleted the last item on the page
      if (classes.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete class");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <ClassFilters
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        selectedStatus={selectedStatus}
        setSelectedStatus={(v) => {
          setSelectedStatus(v);
          setCurrentPage(1);
        }}
      />

      <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
        <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-900">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-900 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Class Name</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Section</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Class Teacher</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Capacity</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Subjects</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Status</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 text-right p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {classes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64">
                    <EmptyState
                      title="No Classes Found"
                      description="Try changing your filters or add a new class."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                classes.map((cls) => {
                  const teacher =
                    typeof cls.classTeacher === "object"
                      ? cls.classTeacher
                      : null;

                  return (
                    <TableRow
                      key={cls._id}
                      className="border-b border-slate-100 dark:border-slate-900 last:border-0 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <TableCell className="p-4 font-semibold text-slate-850 dark:text-slate-200">
                        {cls.name}
                      </TableCell>
                      <TableCell className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">{cls.section}</TableCell>
                      <TableCell className="p-4 text-sm font-medium text-slate-650 dark:text-slate-350">{teacher?.name ?? "—"}</TableCell>
                      <TableCell className="p-4 text-sm text-slate-600 dark:text-slate-400">{cls.capacity} students</TableCell>
                      <TableCell className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {cls.subjects.length === 0 ? (
                            <span className="text-xs text-slate-450 dark:text-slate-500">
                              No subjects
                            </span>
                          ) : (
                            cls.subjects.slice(0, 3).map((sub, idx) => (
                              <span
                                key={idx}
                                className="rounded-lg bg-slate-105 border border-slate-200/40 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300"
                              >
                                {sub}
                              </span>
                            ))
                          )}
                          {cls.subjects.length > 3 && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 px-1 self-center">
                              +{cls.subjects.length - 3} more
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="p-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            cls.status === "Active"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-455"
                          }`}
                        >
                          {cls.status}
                        </span>
                      </TableCell>
                      <TableCell className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/classes/${cls._id}`)}
                            title="View"
                            className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                          >
                            <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              router.push(`/classes/${cls._id}/edit`)
                            }
                            title="Edit"
                            className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                          >
                            <Pencil className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 hover:text-rose-600 dark:text-rose-450 dark:hover:text-rose-350"
                            onClick={() => setDeleteId(cls._id)}
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
        <DialogContent className="rounded-3xl border border-slate-200/50 bg-white/95 dark:border-slate-800/50 dark:bg-slate-950/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-50">Delete Class</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete this class? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)} className="rounded-2xl">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteClassMutation.isPending}
              className="rounded-2xl"
            >
              {deleteClassMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
