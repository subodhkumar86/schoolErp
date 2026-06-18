"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Check, X, Calendar, Phone, Mail, User, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmission } from "@/features/admissions/hooks/useAdmission";
import { useUpdateAdmission } from "@/features/admissions/hooks/useUpdateAdmission";
import Loader from "@/components/shared/Loader";
import { toast } from "sonner";

export default function AdmissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: admission, isLoading, refetch } = useAdmission(id);
  const updateAdmission = useUpdateAdmission();

  const handleStatusChange = async (status: "Approved" | "Rejected") => {
    try {
      await updateAdmission.mutateAsync({
        id,
        data: { status },
      });
      toast.success(`Application ${status.toLowerCase()} successfully`);
      refetch();
    } catch (error) {
      toast.error((error as Error).message || `Failed to ${status.toLowerCase()} application`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!admission) {
    return (
      <div className="rounded-3xl border bg-card p-8 text-center text-muted-foreground shadow-sm">
        Admission application not found or access denied.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admissions")}
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Applicant Details</h1>
            <p className="text-muted-foreground">Review and manage enrollment request</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/admissions/${id}/edit`)}
            className="flex items-center gap-2 rounded-xl"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>

          {admission.status === "Pending" && (
            <>
              <Button
                variant="destructive"
                onClick={() => handleStatusChange("Rejected")}
                disabled={updateAdmission.isPending}
                className="flex items-center gap-2 rounded-xl"
              >
                <X className="h-4 w-4" />
                Reject
              </Button>
              <Button
                onClick={() => handleStatusChange("Approved")}
                disabled={updateAdmission.isPending}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Check className="h-4 w-4" />
                Approve
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Card: Profile & Status Summary */}
        <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow-md shadow-indigo-500/10">
              {admission.studentName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <h2 className="mt-4 text-xl font-bold text-foreground">{admission.studentName}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Applied Class: {admission.appliedClass}</p>

            <span
              className={`mt-4 rounded-full px-3 py-1 text-xs font-semibold ${
                admission.status === "Approved"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : admission.status === "Rejected"
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-450"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
              }`}
            >
              {admission.status}
            </span>
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Gender</span>
              <span className="font-medium">{admission.gender}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Date of Birth</span>
              <span className="font-medium">
                {admission.dateOfBirth ? new Date(admission.dateOfBirth).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Application Date</span>
              <span className="font-medium">{new Date(admission.admissionDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Right Details Card */}
        <div className="md:col-span-2 space-y-6">
          <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-500" />
              Contact Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="text-sm font-semibold">{admission.email || "No email address"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  <p className="text-sm font-semibold">{admission.phone || "No phone number"}</p>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Residential Address</p>
                  <p className="text-sm font-semibold">{admission.address || "No address details logged"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200/50 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 p-6 rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-indigo-500" />
              Parent / Guardian Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Guardian Name</p>
                <p className="text-sm font-semibold mt-1">{admission.parentName || "N/A"}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Guardian Phone Number</p>
                <p className="text-sm font-semibold mt-1">{admission.parentPhone || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
