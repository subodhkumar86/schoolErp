"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { examSchema, type ExamFormValues } from "../schemas/examSchema";
import { useExam } from "../hooks/useExam";
import { useUpdateExam } from "../hooks/useUpdateExam";
import { useClasses } from "@/features/classes/hooks/useClasses";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/Loader";

interface Props {
  examId: string;
}

export default function EditExamForm({ examId }: Props) {
  const router = useRouter();
  const { data: exam, isLoading: isExamLoading } = useExam(examId);
  const updateExam = useUpdateExam();
  const { data: classesRes } = useClasses({ limit: 1000 });
  const classes = classesRes?.data ?? [];
  const uniqueClassNames = Array.from(
    new Set(classes.map((c) => c.name)),
  ).sort();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExamFormValues>({
    resolver: zodResolver(examSchema) as unknown as Resolver<ExamFormValues>,
  });

  useEffect(() => {
    if (exam) {
      reset({
        name: exam.name,
        subject: exam.subject,
        className: exam.className,
        section: exam.section || "",
        date: exam.date ? new Date(exam.date).toISOString().split("T")[0] : "",
        duration: exam.duration,
        totalMarks: exam.totalMarks,
        passingMarks: exam.passingMarks,
        status: exam.status,
        description: exam.description || "",
      });
    }
  }, [exam, reset]);

  const onSubmit = async (data: ExamFormValues) => {
    try {
      await updateExam.mutateAsync({
        id: examId,
        data,
      });

      toast.success("Exam updated successfully");
      router.push("/exams");
    } catch (error) {
      toast.error("Failed to update exam");
      console.error(error);
    }
  };

  if (isExamLoading) {
    return <Loader />;
  }

  if (!exam) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center text-muted-foreground">
        Exam schedule not found.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl bg-card border rounded-3xl p-8 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Exam Name</Label>
          <Input
            id="name"
            placeholder="e.g. Midterm Examination"
            {...register("name")}
            className="mt-1"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="e.g. Mathematics"
            {...register("subject")}
            className="mt-1"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="className">Class</Label>
            <select
              id="className"
              {...register("className")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="">Select Class</option>
              {uniqueClassNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.className && (
              <p className="mt-1 text-sm text-red-500">
                {errors.className.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="section">Section (Optional)</Label>
            <Input
              id="section"
              placeholder="e.g. A"
              {...register("section")}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="date">Exam Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              className="mt-1"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="duration">Duration (Minutes)</Label>
            <Input
              id="duration"
              type="number"
              {...register("duration")}
              className="mt-1"
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-500">
                {errors.duration.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="totalMarks">Total Marks</Label>
            <Input
              id="totalMarks"
              type="number"
              {...register("totalMarks")}
              className="mt-1"
            />
            {errors.totalMarks && (
              <p className="mt-1 text-sm text-red-500">
                {errors.totalMarks.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="passingMarks">Passing Marks</Label>
            <Input
              id="passingMarks"
              type="number"
              {...register("passingMarks")}
              className="mt-1"
            />
            {errors.passingMarks && (
              <p className="mt-1 text-sm text-red-500">
                {errors.passingMarks.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <textarea
            id="description"
            placeholder="Add exam instructions or notes..."
            {...register("description")}
            className="mt-1 w-full min-h-[100px] rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/exams")}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={updateExam.isPending}
        >
          {updateExam.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
