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

export default function TeacherAttendanceTable() {
  const { data: response, isLoading } = useAttendances({ type: "Teacher" });
  const records = response?.data ?? [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <EmptyState
                  title="No Teacher Attendance"
                  description="Mark teacher attendance first."
                />
              </TableCell>
            </TableRow>
          ) : (
            records.map((item: AttendanceRecord) => {
              const entity =
                typeof item.entityId === "object" ? item.entityId : null;

              return (
                <TableRow key={item._id}>
                  <TableCell>{entity?.name ?? "—"}</TableCell>

                  <TableCell>{entity?.department ?? "—"}</TableCell>

                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Present"
                          ? "bg-green-500/20 text-green-500"
                          : item.status === "Absent"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>

                  <TableCell>{item.remarks || "—"}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
