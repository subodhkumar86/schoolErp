"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resultSchema, type ResultFormValues } from "../schemas/resultSchema";
import { useCreateResult } from "../hooks/useCreateResult";
import { useStudents } from "@/features/students/hooks/useStudents";
import { useExams } from "@/features/exams/hooks/useExams";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateResultForm() {
  const router = useRouter();
  const createResult = useCreateResult();

  const { data: studentsRes } = useStudents({ limit: 1000 });
  const { data: examsRes } = useExams({ limit: 1000 });

  const students = studentsRes?.data ?? [];
  const exams = examsRes?.data ?? [];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ResultFormValues>({
    resolver: zodResolver(resultSchema) as unknown as Resolver<ResultFormValues>,
    defaultValues: {
      studentId: "",
      examId: "",
      marksObtained: 0,
      grade: "",
      remarks: "",
    },
  });

  const selectedExamId = watch("examId");

  // Dynamically compute grade on change of marks or exam selection
  const exam = exams.find((e) => e._id === selectedExamId);

  const calculateAndSetGrade = (marks: number) => {
    if (!exam) return;
    const total = exam.totalMarks as number;
    const percentage = (marks / total) * 100;
    let computedGrade = "F";
    if (percentage >= 90) computedGrade = "A+";
    else if (percentage >= 80) computedGrade = "A";
    else if (percentage >= 70) computedGrade = "B";
    else if (percentage >= 60) computedGrade = "C";
    else if (percentage >= 50) computedGrade = "D";
    else if (percentage >= (exam.passingMarks as number)) computedGrade = "E";
    setValue("grade", computedGrade);
  };

  const onSubmit = async (data: ResultFormValues) => {
    if (exam && data.marksObtained > (exam.totalMarks as number)) {
      toast.error(
        `Marks obtained cannot exceed total exam marks (${exam.totalMarks}).`,
      );
      return;
    }

    try {
      await createResult.mutateAsync(data);
      toast.success("Result recorded successfully");
      router.push("/results");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to record result",
      );
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl bg-card border rounded-3xl p-8 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="studentId">Student</Label>
          <select
            id="studentId"
            {...register("studentId")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="">Select Student</option>
            {students.map((std) => (
              <option key={std._id} value={std._id}>
                {std.name} (Roll: {std.rollNumber}, Class: {std.studentClass})
              </option>
            ))}
          </select>
          {errors.studentId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.studentId.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="examId">Exam</Label>
          <select
            id="examId"
            {...register("examId")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="">Select Exam</option>
            {exams.map((ex) => (
              <option key={ex._id as string} value={ex._id as string}>
                {ex.name as string} ({ex.subject as string}) - Total Marks:{" "}
                {ex.totalMarks as number}
              </option>
            ))}
          </select>
          {errors.examId && (
            <p className="mt-1 text-sm text-red-500">{errors.examId.message}</p>
          )}
        </div>

        {exam && (
          <div className="rounded-xl border bg-muted/20 p-4 space-y-2 text-sm">
            <p className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
              Exam Information
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                Subject:{" "}
                <span className="font-semibold">{exam.subject as string}</span>
              </div>
              <div>
                Class Name:{" "}
                <span className="font-semibold">
                  {exam.className as string}
                </span>
              </div>
              <div>
                Total Marks:{" "}
                <span className="font-semibold">{exam.totalMarks as number}</span>
              </div>
              <div>
                Passing Marks:{" "}
                <span className="font-semibold text-green-600">
                  {exam.passingMarks as number}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="marksObtained">Marks Obtained</Label>
            <Input
              id="marksObtained"
              type="number"
              step="any"
              {...register("marksObtained", {
                onChange: (e) => calculateAndSetGrade(Number(e.target.value)),
              })}
              className="mt-1"
            />
            {errors.marksObtained && (
              <p className="mt-1 text-sm text-red-500">
                {errors.marksObtained.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="grade">Grade (Auto-calculated)</Label>
            <Input
              id="grade"
              placeholder="e.g. A+"
              {...register("grade")}
              className="mt-1 bg-muted"
              readOnly
            />
          </div>
        </div>

        <div>
          <Label htmlFor="remarks">Remarks (Optional)</Label>
          <Input
            id="remarks"
            placeholder="e.g. Excellent performance"
            {...register("remarks")}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/results")}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={createResult.isPending}
        >
          {createResult.isPending ? "Creating..." : "Save Result"}
        </Button>
      </div>
    </form>
  );
}
