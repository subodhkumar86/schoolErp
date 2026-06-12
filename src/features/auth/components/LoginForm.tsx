"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-lg">
      <h1 className="text-3xl font-bold">Welcome Back</h1>

      <p className="mt-2 text-muted-foreground">Sign in to EduFlow ERP</p>

      <div className="mt-6 space-y-4">
        <Input type="email" placeholder="Email Address" />

        <Input type="password" placeholder="Password" />

        <Button className="w-full">Sign In</Button>
      </div>

      <div className="mt-4 text-center">
        <Link href="/forgot-password" className="text-sm text-blue-600">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
