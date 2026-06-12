"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useTeacher } from "../hooks/useTeacher";
import { useUpdateTeacher } from "../hooks/useUpdateTeacher";
import { teacherSchema, TeacherFormValues } from "../schemas/teacherSchema";

export default function EditTeacherForm() {
  const params = useParams();
  const router = useRouter();

  const teacherId = params.id as string;

  const { data: teacher, isLoading } = useTeacher(teacherId);
  const updateTeacher = useUpdateTeacher();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
  });

  useEffect(() => {
    if (teacher) {
      reset({
        name: teacher.name || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        employeeId: teacher.employeeId || "",
        department: teacher.department || "",
        qualification: teacher.qualification || "",
        experience: teacher.experience || 0,
        salary: teacher.salary || 0,
        address: teacher.address || "",
        status: teacher.status || "Active",
      });
    }
  }, [teacher, reset]);

  const onSubmit = async (data: TeacherFormValues) => {
    try {
      await updateTeacher.mutateAsync({ id: teacherId, data });
      toast.success("Teacher updated successfully");
      router.push(`/teachers/${teacherId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update teacher");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!teacher) {
    return (
      <div className="rounded-3xl border bg-card p-6">Teacher not found</div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border bg-card p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Full Name *</Label>
          <Input className="mt-2" placeholder="Teacher Name" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label>Email</Label>
          <Input className="mt-2" type="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label>Phone</Label>
          <Input className="mt-2" placeholder="Phone" {...register("phone")} />
        </div>

        <div>
          <Label>Employee ID *</Label>
          <Input className="mt-2" placeholder="Employee ID" {...register("employeeId")} />
          {errors.employeeId && (
            <p className="mt-1 text-sm text-red-500">{errors.employeeId.message}</p>
          )}
        </div>

        <div>
          <Label>Department *</Label>
          <Input className="mt-2" placeholder="Department" {...register("department")} />
          {errors.department && (
            <p className="mt-1 text-sm text-red-500">{errors.department.message}</p>
          )}
        </div>

        <div>
          <Label>Qualification</Label>
          <Input className="mt-2" placeholder="Qualification" {...register("qualification")} />
        </div>

        <div>
          <Label>Experience (years)</Label>
          <Input
            className="mt-2"
            type="number"
            min="0"
            placeholder="0"
            {...register("experience")}
          />
        </div>

        <div>
          <Label>Salary</Label>
          <Input
            className="mt-2"
            type="number"
            min="0"
            placeholder="0"
            {...register("salary")}
          />
        </div>

        <div>
          <Label>Status</Label>
          <select
            className="mt-2 h-10 w-full rounded-md border bg-background px-3"
            {...register("status")}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <Label>Address</Label>
          <Input className="mt-2" placeholder="Address" {...register("address")} />
        </div>

        <div className="md:col-span-2">
          <Button
            type="submit"
            className="w-full"
            disabled={updateTeacher.isPending}
          >
            {updateTeacher.isPending ? "Updating..." : "Update Teacher"}
          </Button>
        </div>
      </div>
    </form>
  );
}
