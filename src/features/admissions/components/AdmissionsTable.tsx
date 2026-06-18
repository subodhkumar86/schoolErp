"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmissions } from "../hooks/useAdmissions";
import { useDeleteAdmission } from "../hooks/useDeleteAdmission";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import AdmissionsFilters from "./AdmissionsFilters";
import AdmissionsStats from "./AdmissionsStats";

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

export default function AdmissionsTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;
  const { data: response, isLoading } = useAdmissions({
    search,
    class: selectedClass,
    status: selectedStatus,
    page: currentPage,
    limit,
  });

  const admissions = response?.data ?? [];
  const total = response?.total ?? 0;
  const stats = response?.stats;

  const totalPages = Math.ceil(total / limit) || 1;

  const deleteAdmissionMutation = useDeleteAdmission();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteAdmissionMutation.mutateAsync(deleteId);
      toast.success("Admission application deleted successfully");
      setDeleteId(null);
      if (admissions.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete admission application");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <AdmissionsStats stats={stats} />

      <AdmissionsFilters
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

      <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
        <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-900">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-900 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-800 dark:text-slate-300 p-4">Applicant</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-300 p-4">Applied Class</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-300 p-4">Parent Name</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-300 p-4">Applied Date</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-300 p-4">Status</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-300 text-right p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {admissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <EmptyState
                      title="No Applications Found"
                      description="Try changing your filters or record a new application."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                admissions.map((admission) => (
                  <TableRow
                    key={admission._id}
                    className="border-b border-slate-100 dark:border-slate-900 last:border-0 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                  >
                    <TableCell className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-sm shadow-indigo-500/10">
                          {admission.studentName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{admission.studentName}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            {admission.email || "No email provided"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {admission.appliedClass}
                    </TableCell>

                    <TableCell className="p-4 text-sm text-slate-700 dark:text-slate-300">
                      {admission.parentName || "N/A"}
                    </TableCell>

                    <TableCell className="p-4 text-sm text-slate-500 dark:text-slate-400">
                      {new Date(admission.admissionDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="p-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          admission.status === "Approved"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : admission.status === "Rejected"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-450"
                            : "bg-amber-100 text-amber-750 dark:bg-amber-950/30 dark:text-amber-400"
                        }`}
                      >
                        {admission.status}
                      </span>
                    </TableCell>

                    <TableCell className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/admissions/${admission._id}`)}
                          title="View"
                          className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/admissions/${admission._id}/edit`)}
                          title="Edit"
                          className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <Pencil className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-350"
                          onClick={() => setDeleteId(admission._id)}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            prevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          />
        )}
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Admission Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this applicant application? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteAdmissionMutation.isPending}
            >
              {deleteAdmissionMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
