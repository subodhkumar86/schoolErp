"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { teacherSchema, TeacherFormValues } from "../schemas/teacherSchema";

import { useCreateTeacher } from "../hooks/useCreateTeacher";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  onSuccess: () => void;
}

export default function CreateTeacherForm({ onSuccess }: Props) {
  const createTeacher = useCreateTeacher();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      employeeId: "",
      department: "",
      qualification: "",
      experience: 0,
      salary: 0,
      address: "",
    },
  });

  const onSubmit = async (data: TeacherFormValues) => {
    try {
      await createTeacher.mutateAsync(data);

      toast.success("Teacher created successfully");

      reset();

      onSuccess();
    } catch (error) {
      toast.error("Failed to create teacher");

      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 md:grid-cols-2"
    >
      <div>
        <Input placeholder="Teacher Name" {...register("name")} />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input placeholder="Email" {...register("email")} />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <Input placeholder="Phone" {...register("phone")} />

      <div>
        <Input placeholder="Employee ID" {...register("employeeId")} />

        {errors.employeeId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.employeeId.message}
          </p>
        )}
      </div>

      <div>
        <Input placeholder="Department" {...register("department")} />

        {errors.department && (
          <p className="mt-1 text-sm text-red-500">
            {errors.department.message}
          </p>
        )}
      </div>

      <Input placeholder="Qualification" {...register("qualification")} />

      <Input
        type="number"
        placeholder="Experience (Years)"
        {...register("experience")}
      />

      <Input type="number" placeholder="Salary" {...register("salary")} />

      <div className="md:col-span-2">
        <Input placeholder="Address" {...register("address")} />
      </div>

      <div className="md:col-span-2">
        <Button
          type="submit"
          className="w-full"
          disabled={createTeacher.isPending}
        >
          {createTeacher.isPending ? "Creating..." : "Create Teacher"}
        </Button>
      </div>
    </form>
  );
}
