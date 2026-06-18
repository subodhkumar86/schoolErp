"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useAdmission } from "../hooks/useAdmission";
import { useUpdateAdmission } from "../hooks/useUpdateAdmission";
import { admissionSchema, AdmissionFormValues } from "../schemas/admissionSchema";

import Loader from "@/components/shared/Loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function EditAdmissionForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: admission, isLoading } = useAdmission(id);
  const updateAdmission = useUpdateAdmission();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema) as unknown as Resolver<AdmissionFormValues>,
  });

  useEffect(() => {
    if (admission) {
      const formattedDob = admission.dateOfBirth
        ? new Date(admission.dateOfBirth).toISOString().split("T")[0]
        : "";

      reset({
        studentName: admission.studentName,
        email: admission.email || "",
        phone: admission.phone || "",
        appliedClass: admission.appliedClass,
        gender: admission.gender,
        dateOfBirth: formattedDob,
        parentName: admission.parentName || "",
        parentPhone: admission.parentPhone || "",
        address: admission.address || "",
        status: admission.status,
      });
    }
  }, [admission, reset]);

  const onSubmit = async (data: AdmissionFormValues) => {
    try {
      await updateAdmission.mutateAsync({
        id,
        data,
      });
      toast.success("Admission application updated successfully");
      router.push(`/admissions/${id}`);
    } catch (error) {
      toast.error((error as Error).message || "Failed to update admission application");
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!admission) {
    return (
      <div className="rounded-3xl border bg-card p-6">Admission application not found</div>
    );
  }

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
            {...register("parentName")}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
          <Input
            id="parentPhone"
            {...register("parentPhone")}
            className="mt-1"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="address">Residential Address</Label>
          <Input
            id="address"
            {...register("address")}
            className="mt-1"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="status">Application Status</Label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none font-semibold text-foreground"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/admissions/${id}`)}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={updateAdmission.isPending}
        >
          {updateAdmission.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
