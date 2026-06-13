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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search student or roll no..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setCurrentPage(1);
            }}
            className="h-10 rounded-md border bg-background px-3"
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
            className="h-10 rounded-md border bg-background px-3"
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
            className="h-10"
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
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
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
                    <TableRow key={attendance._id}>
                      <TableCell className="font-medium">{entity?.name ?? "—"}</TableCell>
                      <TableCell>{entity?.rollNumber ?? "—"}</TableCell>
                      <TableCell>{entity?.studentClass ?? "—"}</TableCell>
                      <TableCell>
                        {new Date(attendance.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            attendance.status === "Present"
                              ? "bg-green-500/20 text-green-600"
                              : attendance.status === "Absent"
                                ? "bg-red-500/20 text-red-600"
                                : attendance.status === "Late"
                                  ? "bg-yellow-500/20 text-yellow-600"
                                  : "bg-blue-500/20 text-blue-600"
                          }`}
                        >
                          {attendance.status}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {attendance.remarks || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewRecord(attendance)}
                          >
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEdit(attendance)}
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(attendance._id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attendance Record Details</DialogTitle>
          </DialogHeader>
          {viewRecord && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground block">Student Name</span>
                  <span className="font-semibold text-sm">
                    {typeof viewRecord.entityId === "object" ? viewRecord.entityId.name : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Roll Number</span>
                  <span className="font-semibold text-sm">
                    {typeof viewRecord.entityId === "object" ? viewRecord.entityId.rollNumber : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Class</span>
                  <span className="font-semibold text-sm">
                    {typeof viewRecord.entityId === "object" ? viewRecord.entityId.studentClass : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Date</span>
                  <span className="font-semibold text-sm">
                    {new Date(viewRecord.date).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Status</span>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 mt-0.5 text-xs font-semibold ${
                      viewRecord.status === "Present"
                        ? "bg-green-500/20 text-green-600"
                        : viewRecord.status === "Absent"
                          ? "bg-red-500/20 text-red-600"
                          : viewRecord.status === "Late"
                            ? "bg-yellow-500/20 text-yellow-600"
                            : "bg-blue-500/20 text-blue-600"
                    }`}
                  >
                    {viewRecord.status}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Marked By</span>
                  <span className="font-semibold text-sm">{viewRecord.markedBy || "—"}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Remarks</span>
                <p className="text-sm border rounded-lg p-3 bg-muted/20 mt-1 whitespace-pre-wrap">
                  {viewRecord.remarks || "No remarks provided."}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editRecord !== null} onOpenChange={(open) => !open && setEditRecord(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Attendance Record</DialogTitle>
          </DialogHeader>
          {editRecord && (
            <div className="space-y-4 pt-4">
              <div>
                <Label>Student</Label>
                <p className="font-semibold text-sm mt-1">
                  {typeof editRecord.entityId === "object" ? editRecord.entityId.name : "—"}
                </p>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as "Present" | "Absent" | "Late" | "Leave")}
                  className="mt-2 w-full h-10 rounded-md border bg-background px-3 text-sm"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>
              <div>
                <Label htmlFor="remarks">Remarks</Label>
                <Input
                  id="remarks"
                  value={editRemarks}
                  onChange={(e) => setEditRemarks(e.target.value)}
                  className="mt-2"
                  placeholder="Enter remarks..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setEditRecord(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={updateAttendance.isPending}>
                  {updateAttendance.isPending ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground pt-2">
            Are you sure you want to delete this attendance record? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteAttendance.isPending}
            >
              {deleteAttendance.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
