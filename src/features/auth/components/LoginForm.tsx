"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const loginSchema = z.object({
  identifier: z.string().min(3, "Username or Email must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await loginMutation.mutateAsync({
        identifier: data.identifier,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      toast.success("Welcome back to EduFlow ERP!");
      router.push("/dashboard");
    } catch (error: unknown) {
      const err = error as { message?: string } | null;
      toast.error(err?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border bg-card/70 backdrop-blur-md p-8 shadow-xl space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
          EduFlow ERP
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access the portal
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="identifier">Username or Email</Label>
          <Input
            id="identifier"
            type="text"
            placeholder="superadmin, admin, or email"
            className="rounded-2xl"
            disabled={loginMutation.isPending}
            {...register("identifier")}
          />
          {errors.identifier?.message && (
            <p className="text-xs font-medium text-destructive">{errors.identifier.message as string}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="rounded-2xl pr-10"
              disabled={loginMutation.isPending}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
              disabled={loginMutation.isPending}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password?.message && (
            <p className="text-xs font-medium text-destructive">{errors.password.message as string}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="rememberMe"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            disabled={loginMutation.isPending}
            {...register("rememberMe")}
          />
          <Label htmlFor="rememberMe" className="text-xs font-normal text-muted-foreground cursor-pointer">
            Remember me on this device
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full rounded-2xl font-semibold mt-2"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="text-center text-xs text-muted-foreground">
        New school or organization?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Start 14-Day Free Trial
        </Link>
      </div>

      <div className="border-t pt-4 text-center text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Standard Demo Accounts:</p>
        <p className="leading-relaxed">
          Admin: <code className="bg-muted px-1 py-0.5 rounded">admin</code> / <code className="bg-muted px-1 py-0.5 rounded">password123</code><br />
          Teacher: <code className="bg-muted px-1 py-0.5 rounded">teacher</code> / <code className="bg-muted px-1 py-0.5 rounded">password123</code><br />
          Student: <code className="bg-muted px-1 py-0.5 rounded">student</code> / <code className="bg-muted px-1 py-0.5 rounded">password123</code>
        </p>
      </div>
    </div>
  );
}
