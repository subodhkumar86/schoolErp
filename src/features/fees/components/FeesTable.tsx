"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFees } from "../hooks/useFees";
import { useDeleteFee } from "../hooks/useDeleteFee";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import FeeFilters from "./FeeFilters";

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

export default function FeesTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedFeeType, setSelectedFeeType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 10;
  const { data: response, isLoading } = useFees({
    search,
    feeType: selectedFeeType,
    status: selectedStatus,
    page: currentPage,
    limit,
  });

  const fees = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const deleteFeeMutation = useDeleteFee();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteFeeMutation.mutateAsync(deleteId);
      toast.success("Fee record deleted successfully");
      setDeleteId(null);
      if (fees.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete fee record");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <FeeFilters
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        selectedFeeType={selectedFeeType}
        setSelectedFeeType={(v) => {
          setSelectedFeeType(v);
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
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <EmptyState
                      title="No Fee Records Found"
                      description="Create a fee record to manage students' billing."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                fees.map((f) => {
                  const student =
                    typeof f.studentId === "object" ? f.studentId : null;

                  return (
                    <TableRow key={f._id}>
                      <TableCell className="font-semibold">
                        {student?.name ?? "—"}
                        {student?.rollNumber ? (
                          <div className="text-xs text-muted-foreground font-normal">
                            Roll: {student.rollNumber}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell>{student?.studentClass ?? "—"}</TableCell>
                      <TableCell>{f.feeType}</TableCell>
                      <TableCell className="font-semibold">
                        ₹{f.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(f.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            f.status === "Paid"
                              ? "bg-green-500/20 text-green-600"
                              : f.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-600"
                                : f.status === "Partial"
                                  ? "bg-blue-500/20 text-blue-600"
                                  : "bg-red-500/20 text-red-600"
                          }`}
                        >
                          {f.status}
                        </span>
                      </TableCell>
                      <TableCell>{f.paymentMethod ?? "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/fees/${f._id}`)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/fees/${f._id}/edit`)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                            onClick={() => setDeleteId(f._id)}
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
            <DialogTitle>Delete Fee Record</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this fee/payment record? This action
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
              disabled={deleteFeeMutation.isPending}
            >
              {deleteFeeMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
