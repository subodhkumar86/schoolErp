"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const registerSchema = z.object({
  schoolName: z.string().min(3, "School Name must be at least 3 characters"),
  adminEmail: z.string().email("Please enter a valid email address"),
  adminUsername: z.string().min(3, "Admin Username must be at least 3 characters"),
  adminPassword: z.string().min(6, "Password must be at least 6 characters"),
  plan: z.enum(["Starter", "Professional", "Enterprise"]),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      schoolName: "",
      adminEmail: "",
      adminUsername: "",
      adminPassword: "",
      plan: "Starter",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Failed to register");
      }

      toast.success("School registered successfully! Please log in.");
      router.push("/login");
    } catch (error: unknown) {
      const err = error as { message?: string } | null;
      toast.error(err?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-xl space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
          EduFlow SaaS Signup
        </h1>
        <p className="text-sm text-muted-foreground">
          Register your school and create an administrator account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="schoolName">School / Organization Name</Label>
          <Input
            id="schoolName"
            type="text"
            placeholder="e.g. Apex Public School"
            className="rounded-2xl"
            disabled={submitting}
            {...register("schoolName")}
          />
          {errors.schoolName?.message && (
            <p className="text-xs font-medium text-destructive">{errors.schoolName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="adminEmail">Administrator Email</Label>
          <Input
            id="adminEmail"
            type="email"
            placeholder="admin@yourschool.com"
            className="rounded-2xl"
            disabled={submitting}
            {...register("adminEmail")}
          />
          {errors.adminEmail?.message && (
            <p className="text-xs font-medium text-destructive">{errors.adminEmail.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="adminUsername">Administrator Username</Label>
          <Input
            id="adminUsername"
            type="text"
            placeholder="e.g. peakadmin"
            className="rounded-2xl"
            disabled={submitting}
            {...register("adminUsername")}
          />
          {errors.adminUsername?.message && (
            <p className="text-xs font-medium text-destructive">{errors.adminUsername.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="adminPassword">Administrator Password</Label>
          <div className="relative">
            <Input
              id="adminPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="rounded-2xl pr-10"
              disabled={submitting}
              {...register("adminPassword")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
              disabled={submitting}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.adminPassword?.message && (
            <p className="text-xs font-medium text-destructive">{errors.adminPassword.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="plan">Subscription Plan</Label>
          <select
            id="plan"
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={submitting}
            {...register("plan")}
          >
            <option value="Starter">Starter Plan (Up to 100 students)</option>
            <option value="Professional">Professional Plan (Up to 500 students)</option>
            <option value="Enterprise">Enterprise Plan (Unlimited)</option>
          </select>
          {errors.plan?.message && (
            <p className="text-xs font-medium text-destructive">{errors.plan.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-2xl font-semibold mt-2"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating School Instance...
            </>
          ) : (
            "Create School Tenant"
          )}
        </Button>
      </form>

      <div className="text-center text-xs text-muted-foreground">
        Already have a school account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
