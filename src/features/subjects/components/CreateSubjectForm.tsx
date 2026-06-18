"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { subjectSchema, type SubjectFormValues } from "../schemas/subjectSchema";
import { useCreateSubject } from "../hooks/useCreateSubject";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateSubjectForm() {
  const router = useRouter();
  const createSubject = useCreateSubject();

  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data: SubjectFormValues) => {
    try {
      await createSubject.mutateAsync(data);
      toast.success("Subject created successfully");
      router.push("/subjects");
    } catch (error: any) {
      toast.error(error.message || "Failed to create subject");
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
          <Label htmlFor="name">Subject Name</Label>
          <Input
            id="name"
            placeholder="e.g. Mathematics, English Literature"
            {...register("name")}
            className="mt-1"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="code">Subject Code</Label>
            <Input
              id="code"
              placeholder="e.g. MATH101, ENG202"
              {...register("code")}
              className="mt-1 font-mono uppercase"
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="type">Subject Type</Label>
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
          <Label htmlFor="description">Description (Optional)</Label>
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
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/subjects")}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={createSubject.isPending}
        >
          {createSubject.isPending ? "Creating..." : "Create Subject"}
        </Button>
      </div>
    </form>
  );
}
