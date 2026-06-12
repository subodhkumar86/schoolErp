"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordForm() {
  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-lg">
      <h1 className="text-3xl font-bold">Forgot Password</h1>

      <p className="mt-2 text-muted-foreground">Reset your password</p>

      <div className="mt-6 space-y-4">
        <Input type="email" placeholder="Email Address" />

        <Button className="w-full">Send Reset Link</Button>
      </div>

      <div className="mt-4 text-center">
        <Link href="/login" className="text-sm text-blue-600">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
