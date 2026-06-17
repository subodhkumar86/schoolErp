"use client";

import { useState } from "react";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import AttendanceStats from "./AttendanceStats";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAttendances } from "../hooks/useAttendances";
import { useDeleteAttendance } from "../hooks/useDeleteAttendance";
import { useUpdateAttendance } from "../hooks/useUpdateAttendance";
import type { AttendanceRecord } from "../types/attendance";
import { Eye, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

export default function AttendanceTable() {
  // Filters & State
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Dialog State
  const [viewRecord, setViewRecord] = useState<AttendanceRecord | null>(null);
  const [editRecord, setEditRecord] = useState<AttendanceRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Edit Form State
  const [editStatus, setEditStatus] = useState<"Present" | "Absent" | "Late" | "Leave">("Present");
  const [editRemarks, setEditRemarks] = useState("");

  // Queries & Mutations
  const { data: response, isLoading } = useAttendances({
    type: "Student",
    search,
    studentClass: selectedClass,
    status: selectedStatus,
    date: selectedDate,
    page: currentPage,
    limit,
  });

  const deleteAttendance = useDeleteAttendance();
  const updateAttendance = useUpdateAttendance();

  const records = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const handleOpenEdit = (record: AttendanceRecord) => {
    setEditRecord(record);
    setEditStatus(record.status);
    setEditRemarks(record.remarks || "");
  };

  const handleUpdate = async () => {
    if (!editRecord) return;
    try {
      await updateAttendance.mutateAsync({
        id: editRecord._id,
        data: {
          status: editStatus,
          remarks: editRemarks,
        },
      });
      toast.success("Attendance record updated successfully");
      setEditRecord(null);
    } catch {
      toast.error("Failed to update attendance record");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteAttendance.mutateAsync(deleteId);
      toast.success("Attendance record deleted successfully");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete attendance record");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search & Filters */}
      <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <Input
              placeholder="Search student or roll no..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-1"
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-700 transition-colors"
          >
            <option value="">All Classes</option>
            <option value="10-A">10-A</option>
            <option value="10-B">10-B</option>
            <option value="9-A">9-A</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-700 transition-colors"
          >
            <option value="">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Leave">Leave</option>
          </select>

          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Stats Section */}
      <AttendanceStats
        type="Student"
        search={search}
        studentClass={selectedClass}
        date={selectedDate}
      />

      {/* Table Section */}
      <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
        <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-900">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-900 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Student</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Roll No</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Class</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Date</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Status</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Remarks</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 text-right p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64">
                    <EmptyState
                      title="No Attendance Records"
                      description="Start by marking attendance or adjust your filters."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                records.map((attendance: AttendanceRecord) => {
                  const entity =
                    typeof attendance.entityId === "object"
                      ? attendance.entityId
                      : null;

                  return (
                    <TableRow
                      key={attendance._id}
                      className="border-b border-slate-100 dark:border-slate-900 last:border-0 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <TableCell className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                        {entity?.name ?? "—"}
                      </TableCell>
                      <TableCell className="p-4 text-sm font-medium text-slate-600 dark:text-slate-350">
                        {entity?.rollNumber ?? "—"}
                      </TableCell>
                      <TableCell className="p-4 text-sm font-medium text-slate-650 dark:text-slate-350">
                        {entity?.studentClass ?? "—"}
                      </TableCell>
                      <TableCell className="p-4 text-sm text-slate-550 dark:text-slate-400">
                        {new Date(attendance.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="p-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            attendance.status === "Present"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                              : attendance.status === "Absent"
                                ? "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-455"
                                : attendance.status === "Late"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                                  : "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                          }`}
                        >
                          {attendance.status}
                        </span>
                      </TableCell>
                      <TableCell className="p-4 max-w-[200px] truncate text-sm text-slate-500 dark:text-slate-450">
                        {attendance.remarks || "—"}
                      </TableCell>
                      <TableCell className="p-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewRecord(attendance)}
                            className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                          >
                            <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(attendance)}
                            className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                          >
                            <Pencil className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(attendance._id)}
                            className="h-8 w-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-350"
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            prevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          />
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={viewRecord !== null} onOpenChange={(open) => !open && setViewRecord(null)}>
        <DialogContent className="rounded-3xl border border-slate-200/50 bg-white/95 dark:border-slate-800/50 dark:bg-slate-950/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-50">Attendance Record Details</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              Complete metadata info logged for this entry.
            </DialogDescription>
          </DialogHeader>
          {viewRecord && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-450 dark:text-slate-500 block font-semibold uppercase tracking-wider">Student Name</span>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {typeof viewRecord.entityId === "object" ? viewRecord.entityId.name : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-450 dark:text-slate-500 block font-semibold uppercase tracking-wider">Roll Number</span>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {typeof viewRecord.entityId === "object" ? viewRecord.entityId.rollNumber : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-450 dark:text-slate-500 block font-semibold uppercase tracking-wider">Class</span>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {typeof viewRecord.entityId === "object" ? viewRecord.entityId.studentClass : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-450 dark:text-slate-500 block font-semibold uppercase tracking-wider">Date</span>
                  <span className="font-bold text-sm text-slate-850 dark:text-slate-200">
                    {new Date(viewRecord.date).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-450 dark:text-slate-500 block font-semibold uppercase tracking-wider">Status</span>
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 mt-1 text-xs font-semibold ${
                      viewRecord.status === "Present"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : viewRecord.status === "Absent"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-455"
                          : viewRecord.status === "Late"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                    }`}
                  >
                    {viewRecord.status}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-450 dark:text-slate-500 block font-semibold uppercase tracking-wider">Marked By</span>
                  <span className="font-bold text-sm text-slate-850 dark:text-slate-200">{viewRecord.markedBy || "—"}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-900">
                <span className="text-xs text-slate-455 dark:text-slate-500 block font-semibold uppercase tracking-wider">Remarks</span>
                <p className="text-sm border border-slate-200/60 dark:border-slate-900 rounded-2xl p-3 bg-slate-50/30 dark:bg-slate-900/30 mt-1.5 whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">
                  {viewRecord.remarks || "No remarks provided."}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editRecord !== null} onOpenChange={(open) => !open && setEditRecord(null)}>
        <DialogContent className="rounded-3xl border border-slate-200/50 bg-white/95 dark:border-slate-800/50 dark:bg-slate-950/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-50">Edit Attendance Record</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              Modify status or add remarks.
            </DialogDescription>
          </DialogHeader>
          {editRecord && (
            <div className="space-y-4 pt-4">
              <div>
                <Label className="text-slate-500 dark:text-slate-400 font-medium">Student</Label>
                <p className="font-semibold text-sm mt-1 text-slate-850 dark:text-slate-200">
                  {typeof editRecord.entityId === "object" ? editRecord.entityId.name : "—"}
                </p>
              </div>
              <div>
                <Label htmlFor="status" className="text-slate-500 dark:text-slate-400 font-medium">Status</Label>
                <select
                  id="status"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as "Present" | "Absent" | "Late" | "Leave")}
                  className="mt-2 w-full h-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-sm text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:focus:ring-slate-700 transition-colors"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>
              <div>
                <Label htmlFor="remarks" className="text-slate-500 dark:text-slate-400 font-medium">Remarks</Label>
                <Input
                  id="remarks"
                  value={editRemarks}
                  onChange={(e) => setEditRemarks(e.target.value)}
                  className="mt-2 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-1"
                  placeholder="Enter remarks..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setEditRecord(null)} className="rounded-2xl">
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={updateAttendance.isPending} className="rounded-2xl">
                  {updateAttendance.isPending ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="rounded-3xl border border-slate-200/50 bg-white/95 dark:border-slate-800/50 dark:bg-slate-950/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-50">Confirm Delete</DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete this attendance record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)} className="rounded-2xl">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteAttendance.isPending}
              className="rounded-2xl"
            >
              {deleteAttendance.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
