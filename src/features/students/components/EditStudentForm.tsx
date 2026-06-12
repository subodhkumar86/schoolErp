"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useStudent } from "../hooks/useStudent";
import { useUpdateStudent } from "../hooks/useUpdateStudent";
import { studentSchema, StudentFormValues } from "../schemas/studentSchema";

import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditStudentForm() {
  const params = useParams();
  const router = useRouter();

  const { data: student, isLoading } = useStudent(params.id as string);
  const updateStudent = useUpdateStudent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
  });

  useEffect(() => {
    if (student) {
      reset({
        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",
        rollNumber: student.rollNumber || "",
        studentClass: student.studentClass || "",
        section: student.section || "",
        gender: (student.gender as "Male" | "Female" | "Other") || "Male",
        address: student.address || "",
        parentName: student.parentName || "",
        parentPhone: student.parentPhone || "",
      });
    }
  }, [student, reset]);

  const onSubmit = async (data: StudentFormValues) => {
    try {
      await updateStudent.mutateAsync({
        id: params.id as string,
        data,
      });
      toast.success("Student updated successfully");
      router.push(`/students/${params.id}`);
    } catch (error) {
      toast.error("Failed to update student");
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!student) {
    return (
      <div className="rounded-3xl border bg-card p-6">Student not found</div>
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
          <Input className="mt-2" placeholder="Student Name" {...register("name")} />
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
          <Label>Roll Number *</Label>
          <Input className="mt-2" placeholder="Roll Number" {...register("rollNumber")} />
          {errors.rollNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.rollNumber.message}</p>
          )}
        </div>

        <div>
          <Label>Class *</Label>
          <Input className="mt-2" placeholder="e.g. 10" {...register("studentClass")} />
          {errors.studentClass && (
            <p className="mt-1 text-sm text-red-500">{errors.studentClass.message}</p>
          )}
        </div>

        <div>
          <Label>Section</Label>
          <Input className="mt-2" placeholder="e.g. A" {...register("section")} />
        </div>

        <div>
          <Label>Gender</Label>
          <select
            className="mt-2 h-10 w-full rounded-md border bg-background px-3"
            {...register("gender")}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <Label>Parent Name</Label>
          <Input className="mt-2" placeholder="Parent Name" {...register("parentName")} />
        </div>

        <div>
          <Label>Parent Phone</Label>
          <Input className="mt-2" placeholder="Parent Phone" {...register("parentPhone")} />
        </div>

        <div className="md:col-span-2">
          <Label>Address</Label>
          <Input className="mt-2" placeholder="Address" {...register("address")} />
        </div>

        <div className="md:col-span-2">
          <Button
            type="submit"
            className="w-full"
            disabled={updateStudent.isPending}
          >
            {updateStudent.isPending ? "Updating..." : "Update Student"}
          </Button>
        </div>
      </div>
    </form>
  );
}
