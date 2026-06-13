"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotices } from "../hooks/useNotices";
import { useDeleteNotice } from "../hooks/useDeleteNotice";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import NoticeFilters from "./NoticeFilters";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function NoticesTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 10;
  const { data: response, isLoading } = useNotices({
    search,
    audience: selectedAudience,
    status: selectedStatus,
    page: currentPage,
    limit,
  });

  const notices = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const deleteNoticeMutation = useDeleteNotice();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteNoticeMutation.mutateAsync(deleteId);
      toast.success("Announcement deleted successfully");
      setDeleteId(null);
      if (notices.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete announcement");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <NoticeFilters
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        selectedAudience={selectedAudience}
        setSelectedAudience={(v) => {
          setSelectedAudience(v);
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
                <TableHead>Title</TableHead>
                <TableHead>Target Audience</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Posted By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {notices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState
                      title="No Announcements Found"
                      description="Create a new notice or update filter criteria."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                notices.map((n) => (
                  <TableRow key={n._id}>
                    <TableCell className="font-semibold text-foreground max-w-[200px] truncate">
                      {n.title}
                    </TableCell>
                    <TableCell>
                      <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                        {n.audience}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(n.postedDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {n.expiryDate ? new Date(n.expiryDate).toLocaleDateString() : "Never"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                        {n.createdBy}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          n.status === "Active"
                            ? "bg-green-500/20 text-green-600"
                            : "bg-red-500/20 text-red-600"
                        }`}
                      >
                        {n.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/notices/${n._id}`)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/notices/${n._id}/edit`)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                          onClick={() => setDeleteId(n._id)}
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
            <DialogTitle>Delete Announcement</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this notice? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteNoticeMutation.isPending}
            >
              {deleteNoticeMutation.isPending ? "Removing..." : "Remove"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
