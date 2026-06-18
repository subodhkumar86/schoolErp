"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { admissionSchema, AdmissionFormValues } from "../schemas/admissionSchema";
import { useCreateAdmission } from "../hooks/useCreateAdmission";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateAdmissionForm() {
  const router = useRouter();
  const createAdmission = useCreateAdmission();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema) as unknown as Resolver<AdmissionFormValues>,
    defaultValues: {
      studentName: "",
      email: "",
      phone: "",
      appliedClass: "Class 9",
      gender: "Male",
      dateOfBirth: "",
      parentName: "",
      parentPhone: "",
      address: "",
      status: "Pending",
    },
  });

  const onSubmit = async (data: AdmissionFormValues) => {
    try {
      await createAdmission.mutateAsync(data);
      toast.success("Admission application registered successfully");
      router.push("/admissions");
    } catch (error) {
      toast.error("Failed to submit admission application");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl bg-card border rounded-3xl p-8 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="studentName">Student Full Name</Label>
          <Input
            id="studentName"
            placeholder="e.g. Rahul Sharma"
            {...register("studentName")}
            className="mt-1"
          />
          {errors.studentName && (
            <p className="mt-1 text-sm text-red-500">{errors.studentName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="e.g. rahul@example.com"
            {...register("email")}
            className="mt-1"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="e.g. +91 9988776655"
            {...register("phone")}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="appliedClass">Applied Class</Label>
          <select
            id="appliedClass"
            {...register("appliedClass")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="Class 9">Class 9</option>
            <option value="Class 10-A">Class 10-A</option>
            <option value="Class 10-B">Class 10-B</option>
            <option value="Class 11-A">Class 11-A</option>
            <option value="Class 12-A">Class 12-A</option>
          </select>
          {errors.appliedClass && (
            <p className="mt-1 text-sm text-red-500">{errors.appliedClass.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            {...register("gender")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth")}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="parentName">Parent/Guardian Name</Label>
          <Input
            id="parentName"
            placeholder="e.g. Suresh Sharma"
            {...register("parentName")}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
          <Input
            id="parentPhone"
            placeholder="e.g. +91 9988771122"
            {...register("parentPhone")}
            className="mt-1"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="address">Residential Address</Label>
          <Input
            id="address"
            placeholder="Complete address details..."
            {...register("address")}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admissions")}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={createAdmission.isPending}
        >
          {createAdmission.isPending ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
}
