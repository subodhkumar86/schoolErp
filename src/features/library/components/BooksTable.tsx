"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooks } from "../hooks/useBooks";
import { useDeleteBook } from "../hooks/useDeleteBook";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import BookFilters from "./BookFilters";

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

export default function BooksTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 10;
  const { data: response, isLoading } = useBooks({
    search,
    category: selectedCategory,
    status: selectedStatus,
    page: currentPage,
    limit,
  });

  const books = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const deleteBookMutation = useDeleteBook();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBookMutation.mutateAsync(deleteId);
      toast.success("Book record deleted successfully from catalog");
      setDeleteId(null);
      if (books.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete book record");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <BookFilters
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={(v) => {
          setSelectedCategory(v);
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
                <TableHead>Book Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Shelf Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {books.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState
                      title="No Books Found"
                      description="Add a new academic textbook or reading book to the library."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                books.map((b) => (
                  <TableRow key={b._id}>
                    <TableCell className="font-semibold text-foreground">
                      {b.title}
                      {b.isbn ? (
                        <div className="text-xs text-muted-foreground font-normal">
                          ISBN: {b.isbn}
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell>{b.author}</TableCell>
                    <TableCell>{b.category}</TableCell>
                    <TableCell>
                      {b.availableCopies} / {b.totalCopies} Available
                    </TableCell>
                    <TableCell>{b.shelfLocation || "—"}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          b.status === "Available"
                            ? "bg-green-500/20 text-green-600"
                            : b.status === "Reserved"
                              ? "bg-blue-500/20 text-blue-600"
                              : "bg-red-500/20 text-red-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/library/${b._id}`)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/library/${b._id}/edit`)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                          onClick={() => setDeleteId(b._id)}
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
            <DialogTitle>Delete Book Record</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this book from the catalog? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteBookMutation.isPending}
            >
              {deleteBookMutation.isPending ? "Removing..." : "Remove"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
