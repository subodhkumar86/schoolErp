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
    <div className="space-y-4 animate-fade-in">
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

      <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
        <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-900">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-900 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Student Name</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Class</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Fee Type</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Amount</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Due Date</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Status</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Payment Method</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 text-right p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-64">
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
                    <TableRow
                      key={f._id}
                      className="border-b border-slate-100 dark:border-slate-900 last:border-0 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <TableCell className="p-4">
                        <div className="font-semibold text-slate-850 dark:text-slate-200">
                          {student?.name ?? "—"}
                        </div>
                        {student?.rollNumber ? (
                          <div className="text-xs text-slate-450 dark:text-slate-500 font-medium mt-0.5">
                            Roll: {student.rollNumber}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell className="p-4 text-sm font-medium text-slate-600 dark:text-slate-350">{student?.studentClass ?? "—"}</TableCell>
                      <TableCell className="p-4 text-sm font-medium text-slate-650 dark:text-slate-300">{f.feeType}</TableCell>
                      <TableCell className="p-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                        ₹{f.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="p-4 text-sm text-slate-550 dark:text-slate-400">
                        {new Date(f.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="p-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            f.status === "Paid"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                              : f.status === "Pending"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                                : f.status === "Partial"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                                  : "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-455"
                          }`}
                        >
                          {f.status}
                        </span>
                      </TableCell>
                      <TableCell className="p-4 text-sm font-medium text-slate-600 dark:text-slate-350">{f.paymentMethod ?? "—"}</TableCell>
                      <TableCell className="p-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/fees/${f._id}`)}
                            title="View Details"
                            className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                          >
                            <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/fees/${f._id}/edit`)}
                            title="Edit"
                            className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                          >
                            <Pencil className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-350"
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
        <DialogContent className="rounded-3xl border border-slate-200/50 bg-white/95 dark:border-slate-800/50 dark:bg-slate-950/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-50">Delete Fee Record</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete this fee/payment record? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)} className="rounded-2xl">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteFeeMutation.isPending}
              className="rounded-2xl"
            >
              {deleteFeeMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
