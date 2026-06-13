"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resultSchema, type ResultFormValues } from "../schemas/resultSchema";
import { useResult } from "../hooks/useResult";
import { useUpdateResult } from "../hooks/useUpdateResult";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/Loader";

interface Props {
  resultId: string;
}

export default function EditResultForm({ resultId }: Props) {
  const router = useRouter();
  const { data: result, isLoading: isResultLoading } = useResult(resultId);
  const updateResult = useUpdateResult();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ResultFormValues>({
    resolver: zodResolver(resultSchema) as unknown as Resolver<ResultFormValues>,
  });

  useEffect(() => {
    if (result) {
      const studentId =
        typeof result.studentId === "object"
          ? result.studentId._id
          : result.studentId;
      const examId =
        typeof result.examId === "object" ? result.examId._id : result.examId;

      reset({
        studentId,
        examId,
        marksObtained: result.marksObtained,
        grade: result.grade,
        remarks: result.remarks || "",
      });
    }
  }, [result, reset]);

  const exam =
    result && typeof result.examId === "object" ? result.examId : null;

  const calculateAndSetGrade = (marks: number) => {
    if (!exam) return;
    const total = exam.totalMarks;
    const percentage = (marks / total) * 100;
    let computedGrade = "F";
    if (percentage >= 90) computedGrade = "A+";
    else if (percentage >= 80) computedGrade = "A";
    else if (percentage >= 70) computedGrade = "B";
    else if (percentage >= 60) computedGrade = "C";
    else if (percentage >= 50) computedGrade = "D";
    else if (percentage >= exam.passingMarks) computedGrade = "E";
    setValue("grade", computedGrade);
  };

  const onSubmit = async (data: ResultFormValues) => {
    if (exam && data.marksObtained > exam.totalMarks) {
      toast.error(
        `Marks obtained cannot exceed total exam marks (${exam.totalMarks}).`,
      );
      return;
    }

    try {
      await updateResult.mutateAsync({
        id: resultId,
        data: {
          marksObtained: data.marksObtained,
          grade: data.grade,
          remarks: data.remarks,
        },
      });
      toast.success("Result updated successfully");
      router.push("/results");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update result",
      );
      console.error(error);
    }
  };

  if (isResultLoading) {
    return <Loader />;
  }

  if (!result) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center text-muted-foreground">
        Result record not found.
      </div>
    );
  }

  const student =
    typeof result.studentId === "object" ? result.studentId : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl bg-card border rounded-3xl p-8 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <Label>Student</Label>
          <p className="font-semibold text-sm mt-1">
            {student?.name ?? "—"} (Roll: {student?.rollNumber ?? "—"}, Class:{" "}
            {student?.studentClass ?? "—"})
          </p>
        </div>

        <div>
          <Label>Exam</Label>
          <p className="font-semibold text-sm mt-1">
            {exam?.name ?? "—"} ({exam?.subject ?? "—"})
          </p>
        </div>

        {exam && (
          <div className="rounded-xl border bg-muted/20 p-4 space-y-2 text-sm">
            <p className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">
              Exam Information
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                Subject: <span className="font-semibold">{exam.subject}</span>
              </div>
              <div>
                Class Name: <span className="font-semibold">{exam.name}</span>
              </div>
              <div>
                Total Marks: <span className="font-semibold">{exam.totalMarks}</span>
              </div>
              <div>
                Passing Marks:{" "}
                <span className="font-semibold text-green-600">
                  {exam.passingMarks}
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
            placeholder="e.g. Good performance"
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
          disabled={updateResult.isPending}
        >
          {updateResult.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
