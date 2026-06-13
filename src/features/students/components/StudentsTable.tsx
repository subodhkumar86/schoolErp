"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useStudents } from "../hooks/useStudents";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import StudentsFilters from "./StudentsFilters";
import DeleteStudentDialog from "./DeleteStudentDialog";

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

interface Student {
  _id: string;
  name: string;
  email?: string;
  rollNumber: string;
  studentClass: string;
  section?: string;
  attendance?: number;
  status: "Active" | "Inactive";
}

export default function StudentsTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: response, isLoading } = useStudents({
    search,
    class: selectedClass,
    status: selectedStatus,
    page: currentPage,
    limit: 10,
  });

  const students: Student[] = response?.data ?? [];
  const total = response?.total ?? 0;

  const totalPages = Math.ceil(total / 10);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <StudentsFilters
        search={search}
        setSearch={(v) => { setSearch(v); setCurrentPage(1); }}
        selectedClass={selectedClass}
        setSelectedClass={(v) => { setSelectedClass(v); setCurrentPage(1); }}
        selectedStatus={selectedStatus}
        setSelectedStatus={(v) => { setSelectedStatus(v); setCurrentPage(1); }}
      />

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyState
                    title="No Students Found"
                    description="Try changing your filters or add a new student."
                  />
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {student.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{student.rollNumber}</TableCell>

                  <TableCell>
                    {student.studentClass}
                    {student.section ? `-${student.section}` : ""}
                  </TableCell>

                  <TableCell>{student.attendance ?? 100}%</TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        student.status === "Active"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {student.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/students/${student._id}`)}
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          router.push(`/students/${student._id}/edit`)
                        }
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(student._id)}
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          prevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        />
      </div>

      {deleteId && (
        <DeleteStudentDialog
          studentId={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
