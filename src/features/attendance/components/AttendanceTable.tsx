"use client";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAttendances } from "../hooks/useAttendances";
import type { AttendanceRecord } from "../types/attendance";

export default function AttendanceTable() {
  const { data: response, isLoading } = useAttendances({ type: "Student" });
  const records = response?.data ?? [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="rounded-3xl border bg-card shadow-sm">
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
            </TableRow>
          </TableHeader>

          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyState
                    title="No Attendance Records"
                    description="Start by marking attendance."
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
                    <TableCell>{entity?.name ?? "—"}</TableCell>

                    <TableCell>{entity?.rollNumber ?? "—"}</TableCell>

                    <TableCell>{entity?.studentClass ?? "—"}</TableCell>

                    <TableCell>
                      {new Date(attendance.date).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          attendance.status === "Present"
                            ? "bg-green-500/20 text-green-500"
                            : attendance.status === "Absent"
                              ? "bg-red-500/20 text-red-500"
                              : attendance.status === "Late"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-blue-500/20 text-blue-500"
                        }`}
                      >
                        {attendance.status}
                      </span>
                    </TableCell>

                    <TableCell>{attendance.remarks || "—"}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
