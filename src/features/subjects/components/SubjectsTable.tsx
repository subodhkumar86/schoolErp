"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSubjects } from "../hooks/useSubjects";
import { useDeleteSubject } from "../hooks/useDeleteSubject";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import SubjectsFilters from "./SubjectsFilters";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SubjectsTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 10;
  const { data: response, isLoading } = useSubjects({
    search,
    type: selectedType,
    page: currentPage,
    limit,
  });

  const subjects = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const deleteSubjectMutation = useDeleteSubject();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteSubjectMutation.mutateAsync(deleteId);
      toast.success("Subject deleted successfully");
      setDeleteId(null);
      if (subjects.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete subject");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <SubjectsFilters
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        selectedType={selectedType}
        setSelectedType={(v) => {
          setSelectedType(v);
          setCurrentPage(1);
        }}
      />

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Subject Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {subjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <EmptyState
                      title="No Subjects Found"
                      description="Create a new academic subject to get started."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                subjects.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell className="font-semibold text-foreground">
                      {s.name}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {s.code}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          s.type === "Theory"
                            ? "bg-purple-500/20 text-purple-600"
                            : s.type === "Practical"
                              ? "bg-amber-500/20 text-amber-600"
                              : "bg-indigo-500/20 text-indigo-600"
                        }`}
                      >
                        {s.type}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {s.description || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/subjects/${s._id}/edit`)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                          onClick={() => setDeleteId(s._id)}
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
            <DialogTitle>Delete Subject</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this academic subject? It will be removed from the subject registry.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteSubjectMutation.isPending}
            >
              {deleteSubjectMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
