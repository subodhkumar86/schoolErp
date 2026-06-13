"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateNoticeForm from "@/features/notices/components/CreateNoticeForm";

export default function CreateNoticePage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/notices")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Announcement</h1>
          <p className="text-muted-foreground">
            Publish a new school notice to target audience
          </p>
        </div>
      </div>

      <CreateNoticeForm />
    </div>
  );
}
