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

      <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
        <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-900">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-900 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Student</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Roll Number</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Class</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Attendance</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Status</TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-350 text-right p-4">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <EmptyState
                      title="No Students Found"
                      description="Try changing your filters or add a new student."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow
                    key={student._id}
                    className="border-b border-slate-100 dark:border-slate-900 last:border-0 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                  >
                    <TableCell className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-sm shadow-blue-500/10">
                          {student.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-850 dark:text-slate-200">{student.name}</p>
                          <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">{student.rollNumber}</TableCell>

                    <TableCell className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {student.studentClass}
                      {student.section ? `-${student.section}` : ""}
                    </TableCell>

                    <TableCell className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-250">
                      {student.attendance ?? 100}%
                    </TableCell>

                    <TableCell className="p-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          student.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-450"
                        }`}
                      >
                        {student.status}
                      </span>
                    </TableCell>

                    <TableCell className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/students/${student._id}`)}
                          title="View"
                          className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(`/students/${student._id}/edit`)
                          }
                          title="Edit"
                          className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                        >
                          <Pencil className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-350"
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
        </div>

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
