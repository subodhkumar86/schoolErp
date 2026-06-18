"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { subjectSchema, type SubjectFormValues } from "../schemas/subjectSchema";
import { useSubject } from "../hooks/useSubject";
import { useUpdateSubject } from "../hooks/useUpdateSubject";
import Loader from "@/components/shared/Loader";

interface Props {
  subjectId: string;
}

export default function EditSubjectForm({ subjectId }: Props) {
  const router = useRouter();
  const { data: subject, isLoading } = useSubject(subjectId);
  const updateSubject = useUpdateSubject(subjectId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema) as unknown as Resolver<SubjectFormValues>,
    defaultValues: {
      name: "",
      code: "",
      type: "Theory",
      description: "",
    },
  });

  useEffect(() => {
    if (subject) {
      reset({
        name: subject.name,
        code: subject.code,
        type: subject.type,
        description: subject.description || "",
      });
    }
  }, [subject, reset]);

  const onSubmit = async (data: SubjectFormValues) => {
    try {
      await updateSubject.mutateAsync(data);
      toast.success("Subject updated successfully");
      router.push("/subjects");
    } catch (error: any) {
      toast.error(error.message || "Failed to update subject");
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!subject) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        Subject not found.
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
          <label className="text-sm font-medium" htmlFor="name">Subject Name</label>
          <input
            id="name"
            placeholder="e.g. Mathematics, English Literature"
            {...register("name")}
            className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="code">Subject Code</label>
            <input
              id="code"
              placeholder="e.g. MATH101, ENG202"
              {...register("code")}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono uppercase"
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="type">Subject Type</label>
            <select
              id="type"
              {...register("type")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
              <option value="Both">Both (Theory & Practical)</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            rows={3}
            placeholder="Brief overview of course details or curriculum"
            {...register("description")}
            className="mt-1 w-full rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={() => router.push("/subjects")}
          className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          disabled={updateSubject.isPending}
        >
          {updateSubject.isPending ? "Updating..." : "Update Subject"}
        </button>
      </div>
    </form>
  );
}
