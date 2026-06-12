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

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {teachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyState
                    title="No Teachers Found"
                    description="Try changing your filters or add a new teacher."
                  />
                </TableCell>
              </TableRow>
            ) : (
              teachers.map((teacher) => (
                <TableRow key={teacher._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {teacher.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {teacher.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{teacher.employeeId}</TableCell>

                  <TableCell>{teacher.department}</TableCell>

                  <TableCell>{teacher.experience ?? 0} yrs</TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        teacher.status === "Active"
                          ? "bg-green-500/20 text-green-500"
                          : teacher.status === "On Leave"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/teachers/${teacher._id}`)}
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          router.push(`/teachers/${teacher._id}/edit`)
                        }
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          prevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        />
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Teacher</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteTeacher.isPending}
            >
              {deleteTeacher.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
