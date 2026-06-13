"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { homeworkSchema, type HomeworkFormValues } from "../schemas/homeworkSchema";
import { useCreateHomework } from "../hooks/useCreateHomework";
import { useClasses } from "@/features/classes/hooks/useClasses";
import { useTeachers } from "@/features/teachers/hooks/useTeachers";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateHomeworkForm() {
  const router = useRouter();
  const createHomework = useCreateHomework();

  const { data: classesRes } = useClasses({ limit: 1000 });
  const { data: teachersRes } = useTeachers({ limit: 1000 });

  const classes = classesRes?.data ?? [];
  const teachers = teachersRes?.data ?? [];
  const uniqueClassNames = Array.from(
    new Set(classes.map((c) => c.name)),
  ).sort();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeworkFormValues>({
    resolver: zodResolver(homeworkSchema) as unknown as Resolver<HomeworkFormValues>,
    defaultValues: {
      title: "",
      description: "",
      className: "",
      section: "",
      subject: "",
      dueDate: new Date().toISOString().split("T")[0],
      status: "Active",
      teacherId: "",
      maxPoints: 100,
    },
  });

  const onSubmit = async (data: HomeworkFormValues) => {
    try {
      await createHomework.mutateAsync({
        ...data,
        teacherId: data.teacherId || undefined,
      });
      toast.success("Homework assignment created successfully");
      router.push("/homework");
    } catch (error) {
      toast.error("Failed to create assignment");
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
          <Label htmlFor="title">Assignment Title</Label>
          <Input
            id="title"
            placeholder="e.g. Chapter 4 Exercises, Physics Lab Report"
            {...register("title")}
            className="mt-1"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="e.g. Mathematics, Science"
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
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate")}
              className="mt-1"
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-500">{errors.dueDate.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="maxPoints">Max Points</Label>
            <Input
              id="maxPoints"
              type="number"
              {...register("maxPoints")}
              className="mt-1"
            />
            {errors.maxPoints && (
              <p className="mt-1 text-sm text-red-500">
                {errors.maxPoints.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="teacherId">Assigned Teacher</Label>
          <select
            id="teacherId"
            {...register("teacherId")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="">Select Teacher (Optional)</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name} ({t.employeeId})
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div>
          <Label htmlFor="description">Assignment Description</Label>
          <textarea
            id="description"
            placeholder="Describe homework task instructions, readings, or questions..."
            {...register("description")}
            className="mt-1 w-full min-h-[120px] rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/homework")}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={createHomework.isPending}
        >
          {createHomework.isPending ? "Creating..." : "Save Assignment"}
        </Button>
      </div>
    </form>
  );
}
