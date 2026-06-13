"use client";

import { useParams, useRouter } from "next/navigation";
import { useNotice } from "@/features/notices/hooks/useNotice";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EditNoticeForm from "@/features/notices/components/EditNoticeForm";

export default function EditNoticePage() {
  const params = useParams();
  const router = useRouter();
  const noticeId = params.id as string;
  const { data: notice, isLoading } = useNotice(noticeId);

  if (isLoading) return <Loader />;

  if (!notice) {
    return (
      <div className="rounded-3xl border bg-card p-6 text-center text-muted-foreground">
        Notice announcement not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/notices/${noticeId}`)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Announcement</h1>
          <p className="text-muted-foreground">
            Update publish dates, status, audience, or title and body content
          </p>
        </div>
      </div>

      <EditNoticeForm notice={notice} />
    </div>
  );
}
