"use client";

import { useRouter } from "next/navigation";
import CreateTeacherForm from "@/features/teachers/components/CreateTeacherForm";

export default function CreateTeacherPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Teacher</h1>
        <p className="text-muted-foreground">Add a new teacher to the system</p>
      </div>

      <CreateTeacherForm onSuccess={() => router.push("/teachers")} />
    </div>
  );
}
