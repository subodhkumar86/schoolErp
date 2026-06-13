"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { classSchema, type ClassFormValues } from "../schemas/classSchema";
import { useClass } from "../hooks/useClass";
import { useUpdateClass } from "../hooks/useUpdateClass";
import { useTeachers } from "@/features/teachers/hooks/useTeachers";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/Loader";

interface Props {
  classId: string;
}

export default function EditClassForm({ classId }: Props) {
  const router = useRouter();
  const { data: cls, isLoading: isClassLoading } = useClass(classId);
  const updateClass = useUpdateClass();
  const { data: teachersRes } = useTeachers({ limit: 1000 });
  const teachers = teachersRes?.data ?? [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema) as unknown as Resolver<ClassFormValues>,
  });

  useEffect(() => {
    if (cls) {
      const teacherId =
        typeof cls.classTeacher === "object" && cls.classTeacher !== null
          ? cls.classTeacher._id
          : typeof cls.classTeacher === "string"
            ? cls.classTeacher
            : "";

      reset({
        name: cls.name,
        section: cls.section,
        classTeacher: teacherId,
        capacity: cls.capacity,
        subjectsString: cls.subjects ? cls.subjects.join(", ") : "",
        status: cls.status,
      });
    }
  }, [cls, reset]);

  const onSubmit = async (data: ClassFormValues) => {
    try {
      const subjects = data.subjectsString
        ? data.subjectsString
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      await updateClass.mutateAsync({
        id: classId,
        data: {
          name: data.name,
          section: data.section,
          classTeacher: data.classTeacher || undefined,
          capacity: data.capacity,
          subjects,
          status: data.status,
        },
      });

      toast.success("Class updated successfully");
      router.push("/classes");
    } catch (error) {
      toast.error("Failed to update class");
      console.error(error);
    }
  };

  if (isClassLoading) {
    return <Loader />;
  }

  if (!cls) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center text-muted-foreground">
        Class not found.
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
          <Label htmlFor="name">Class Name</Label>
          <Input
            id="name"
            placeholder="e.g. Grade 10"
            {...register("name")}
            className="mt-1"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="section">Section</Label>
          <Input
            id="section"
            placeholder="e.g. A"
            {...register("section")}
            className="mt-1"
          />
          {errors.section && (
            <p className="mt-1 text-sm text-red-500">
              {errors.section.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="classTeacher">Class Teacher</Label>
          <select
            id="classTeacher"
            {...register("classTeacher")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="">Select Class Teacher (Optional)</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name} ({teacher.employeeId})
              </option>
            ))}
          </select>
          {errors.classTeacher && (
            <p className="mt-1 text-sm text-red-500">
              {errors.classTeacher.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            {...register("capacity")}
            className="mt-1"
          />
          {errors.capacity && (
            <p className="mt-1 text-sm text-red-500">
              {errors.capacity.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="subjectsString">Subjects (comma separated)</Label>
          <Input
            id="subjectsString"
            placeholder="e.g. Mathematics, Science"
            {...register("subjectsString")}
            className="mt-1"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Separate multiple subjects with commas
          </p>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/classes")}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={updateClass.isPending}
        >
          {updateClass.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
