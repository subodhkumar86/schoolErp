"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { studentSchema, StudentFormValues } from "../schemas/studentSchema";
import { useCreateStudent } from "../hooks/useCreateStudent";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreateStudentFormProps {
  onSuccess: () => void;
}

export default function CreateStudentForm({
  onSuccess,
}: CreateStudentFormProps) {
  const createStudent = useCreateStudent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      rollNumber: "",
      studentClass: "",
      section: "A",
      gender: "Male",
      address: "",
      parentName: "",
      parentPhone: "",
    },
  });

  const onSubmit = async (data: StudentFormValues) => {
    try {
      await createStudent.mutateAsync(data);

      toast.success("Student created successfully");

      reset();

      onSuccess();
    } catch (error) {
      toast.error("Failed to create student");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 md:grid-cols-2"
    >
      <div>
        <Input placeholder="Student Name" {...register("name")} />
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

      <div>
        <Input placeholder="Phone" {...register("phone")} />
      </div>

      <div>
        <Input placeholder="Roll Number" {...register("rollNumber")} />
        {errors.rollNumber && (
          <p className="mt-1 text-sm text-red-500">
            {errors.rollNumber.message}
          </p>
        )}
      </div>

      <div>
        <Input placeholder="Class" {...register("studentClass")} />
        {errors.studentClass && (
          <p className="mt-1 text-sm text-red-500">
            {errors.studentClass.message}
          </p>
        )}
      </div>

      <div>
        <Input placeholder="Section" {...register("section")} />
      </div>

      <div>
        <Input placeholder="Gender" {...register("gender")} />
      </div>

      <div>
        <Input placeholder="Parent Name" {...register("parentName")} />
      </div>

      <div>
        <Input placeholder="Parent Phone" {...register("parentPhone")} />
      </div>

      <div className="md:col-span-2">
        <Input placeholder="Address" {...register("address")} />
      </div>

      <div className="md:col-span-2">
        <Button
          type="submit"
          className="w-full"
          disabled={createStudent.isPending}
        >
          {createStudent.isPending ? "Creating..." : "Create Student"}
        </Button>
      </div>
    </form>
  );
}
