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
    <div className="space-y-4">
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

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {classes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
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
                    <TableRow key={cls._id}>
                      <TableCell className="font-semibold">
                        {cls.name}
                      </TableCell>
                      <TableCell>{cls.section}</TableCell>
                      <TableCell>{teacher?.name ?? "—"}</TableCell>
                      <TableCell>{cls.capacity} students</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {cls.subjects.length === 0 ? (
                            <span className="text-xs text-muted-foreground">
                              No subjects
                            </span>
                          ) : (
                            cls.subjects.slice(0, 3).map((sub, idx) => (
                              <span
                                key={idx}
                                className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                              >
                                {sub}
                              </span>
                            ))
                          )}
                          {cls.subjects.length > 3 && (
                            <span className="text-xs text-muted-foreground px-1 self-center">
                              +{cls.subjects.length - 3} more
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            cls.status === "Active"
                              ? "bg-green-500/20 text-green-600"
                              : "bg-red-500/20 text-red-600"
                          }`}
                        >
                          {cls.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/classes/${cls._id}`)}
                            title="View"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              router.push(`/classes/${cls._id}/edit`)
                            }
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Class</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this class? This action cannot be
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
              disabled={deleteClassMutation.isPending}
            >
              {deleteClassMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
