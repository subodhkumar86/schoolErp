"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudents } from "../hooks/useStudents";
import { useClasses } from "@/features/classes/hooks/useClasses";
import { toast } from "sonner";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

export default function PromoteStudentsForm() {
  const router = useRouter();

  const [sourceClassState, setSourceClassState] = useState<string | null>(null);
  const [targetClassState, setTargetClassState] = useState<string | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isPromoting, setIsPromoting] = useState(false);

  // Load classes dynamically
  const { data: classesResponse, isLoading: classesLoading } = useClasses({ limit: 100 });
  const classesList = React.useMemo(() => classesResponse?.data ?? [], [classesResponse]);

  const sourceClass = sourceClassState !== null
    ? sourceClassState
    : (classesList[0]
        ? (classesList[0].section ? `${classesList[0].name}-${classesList[0].section}` : classesList[0].name)
        : "");

  const targetClass = targetClassState !== null
    ? targetClassState
    : (classesList[1] || classesList[0]
        ? ((classesList[1] || classesList[0]).section
            ? `${(classesList[1] || classesList[0]).name}-${(classesList[1] || classesList[0]).section}`
            : (classesList[1] || classesList[0]).name)
        : "");

  // Load students belonging to source class
  const { data: response, isLoading } = useStudents({
    class: sourceClass,
    limit: 100,
  });

  const students = response?.data ?? [];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudentIds(students.map((s) => s._id));
    } else {
      setSelectedStudentIds([]);
    }
  };

  const handleSelectStudent = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStudentIds((prev) => [...prev, id]);
    } else {
      setSelectedStudentIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handlePromote = async (action: "Promote" | "Retain") => {
    if (selectedStudentIds.length === 0) {
      toast.error("Please select at least one student to promote/retain");
      return;
    }

    setIsPromoting(true);
    try {
      const res = await fetch("/api/students/promote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentIds: selectedStudentIds,
          targetClass,
          action,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to process promotion");
      }

      toast.success(
        action === "Promote"
          ? `Successfully promoted ${selectedStudentIds.length} students to ${targetClass}`
          : `Retained ${selectedStudentIds.length} students`
      );
      setSelectedStudentIds([]);
      router.push("/students");
    } catch {
      toast.error("An error occurred during promotion");
    } finally {
      setIsPromoting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="sourceClass">Source Class (Current)</Label>
            <select
              id="sourceClass"
              value={sourceClass}
              onChange={(e) => {
                setSourceClassState(e.target.value);
                setSelectedStudentIds([]);
              }}
              className="mt-2 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
              disabled={classesLoading}
            >
              {classesLoading ? (
                <option>Loading classes...</option>
              ) : classesList.length === 0 ? (
                <option value="">No classes registered</option>
              ) : (
                classesList.map((c) => {
                  const val = c.section ? `${c.name}-${c.section}` : c.name;
                  return (
                    <option key={c._id} value={val}>
                      {val}
                    </option>
                  );
                })
              )}
            </select>
          </div>

          <div>
            <Label htmlFor="targetClass">Target Class (Next Session)</Label>
            <select
              id="targetClass"
              value={targetClass}
              onChange={(e) => setTargetClassState(e.target.value)}
              className="mt-2 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
              disabled={classesLoading}
            >
              {classesLoading ? (
                <option>Loading classes...</option>
              ) : classesList.length === 0 ? (
                <option value="">No classes registered</option>
              ) : (
                classesList.map((c) => {
                  const val = c.section ? `${c.name}-${c.section}` : c.name;
                  return (
                    <option key={c._id} value={val}>
                      {val}
                    </option>
                  );
                })
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Students Listing Table */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-bold text-lg">Active Students in {sourceClass}</h3>
          
          <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-900">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-900 hover:bg-slate-50/50">
                  <TableHead className="w-12 p-4">
                    <input
                      type="checkbox"
                      checked={students.length > 0 && selectedStudentIds.length === students.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-350 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Student Name</TableHead>
                  <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Roll Number</TableHead>
                  <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Current Class</TableHead>
                  <TableHead className="font-semibold text-slate-800 dark:text-slate-350 p-4">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                      No active students found in {sourceClass}.
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => (
                    <TableRow
                      key={student._id}
                      className="border-b border-slate-100 dark:border-slate-900 last:border-0 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <TableCell className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedStudentIds.includes(student._id)}
                          onChange={(e) => handleSelectStudent(student._id, e.target.checked)}
                          className="h-4 w-4 rounded border-slate-350 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </TableCell>
                      <TableCell className="p-4 font-semibold text-slate-850 dark:text-slate-200">
                        {student.name}
                      </TableCell>
                      <TableCell className="p-4 text-sm text-slate-650 dark:text-slate-400">
                        {student.rollNumber}
                      </TableCell>
                      <TableCell className="p-4 text-sm text-slate-650 dark:text-slate-400">
                        {student.studentClass}
                      </TableCell>
                      <TableCell className="p-4">
                        <span className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 px-2.5 py-0.5 text-xs font-semibold">
                          {student.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex gap-4 pt-4 justify-end">
            <Button
              variant="outline"
              onClick={() => handlePromote("Retain")}
              disabled={isPromoting || selectedStudentIds.length === 0}
              className="rounded-xl w-36 border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              Retain Selected
            </Button>
            <Button
              onClick={() => handlePromote("Promote")}
              disabled={isPromoting || selectedStudentIds.length === 0}
              className="rounded-xl w-36 bg-blue-600 text-white hover:bg-blue-700"
            >
              {isPromoting ? "Promoting..." : "Promote Selected"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
