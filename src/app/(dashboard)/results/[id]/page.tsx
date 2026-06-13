"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useResult } from "@/features/results/hooks/useResult";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Pencil,
  Clock,
  Award,
  GraduationCap,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function ResultDetailPage() {
  const params = useParams();
  const router = useRouter();
  const resultId = params.id as string;
  const { data: result, isLoading } = useResult(resultId);

  if (isLoading) return <Loader />;

  if (!result) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Result record not found
      </div>
    );
  }

  const student =
    typeof result.studentId === "object" ? result.studentId : null;
  const exam = typeof result.examId === "object" ? result.examId : null;

  const percentage =
    student && exam ? Math.round((result.marksObtained / exam.totalMarks) * 100) : 0;
  const isPassed =
    student && exam ? result.marksObtained >= exam.passingMarks : false;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/results")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Academic Performance Details</h1>
            <p className="text-muted-foreground">
              Detailed student evaluation metrics and exam scores
            </p>
          </div>
        </div>

        <Link href={`/results/${resultId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Result
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {student?.name ?? "—"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Roll Number: {student?.rollNumber ?? "—"} | Class:{" "}
              {student?.studentClass ?? "—"}{" "}
              {student?.section ? `(${student.section})` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isPassed ? (
              <span className="flex items-center gap-1.5 rounded-full bg-green-500/20 px-3.5 py-1 text-xs font-semibold text-green-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Pass
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3.5 py-1 text-xs font-semibold text-red-600">
                <XCircle className="h-3.5 w-3.5" />
                Fail
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Exam & Subject
              </p>
              <h4 className="font-bold text-lg mt-1">{exam?.name ?? "—"}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Subject: {exam?.subject ?? "—"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Evaluation Date
              </p>
              <h4 className="font-bold text-lg mt-1">
                {exam?.date ? new Date(exam.date).toLocaleDateString() : "—"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Academic Record
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Evaluation Grade
              </p>
              <h4 className="font-bold text-lg mt-1">{result.grade}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Score Percentile: {percentage}%
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 pt-4">
          <div className="rounded-2xl border p-6 space-y-4">
            <h3 className="text-lg font-bold border-b pb-2">Score Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Marks Obtained:</span>
                <span className="font-bold">{result.marksObtained}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Exam Marks:</span>
                <span className="font-bold">{exam?.totalMarks ?? "—"}</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-muted-foreground">Percentage Score:</span>
                <span className="font-bold text-blue-600">{percentage}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Passing Threshold:</span>
                <span className="font-bold text-green-600">
                  {exam?.passingMarks ?? "—"} Marks
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-6 space-y-4">
            <h3 className="text-lg font-bold border-b pb-2">Remarks / Notes</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed min-h-[100px] border rounded-xl p-4 bg-muted/10">
              {result.remarks ||
                "No evaluation remarks recorded for this result."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
