"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useNotice } from "@/features/notices/hooks/useNotice";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Megaphone, Calendar, User, ShieldCheck } from "lucide-react";

export default function NoticeDetailPage() {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/notices")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Announcement Details</h1>
            <p className="text-muted-foreground">
              View published school notice details
            </p>
          </div>
        </div>

        <Link href={`/notices/${noticeId}/edit`} passHref legacyBehavior>
          <Button className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            Edit Announcement
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{notice.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Notice ID: {notice._id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                notice.status === "Active"
                  ? "bg-green-500/20 text-green-600"
                  : "bg-red-500/20 text-red-600"
              }`}
            >
              {notice.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Megaphone className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Audience Group
              </p>
              <h4 className="font-bold text-lg mt-1">{notice.audience}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Target audience
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Published On
              </p>
              <h4 className="font-bold text-lg mt-1">
                {new Date(notice.postedDate).toLocaleDateString()}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Publication date
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Expiry Date
              </p>
              <h4 className="font-bold text-lg mt-1">
                {notice.expiryDate ? new Date(notice.expiryDate).toLocaleDateString() : "Never"}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Archival schedule
              </p>
            </div>
          </div>

          <div className="rounded-2xl border p-5 flex items-start gap-4">
            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-500">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                Author
              </p>
              <h4 className="font-bold text-lg mt-1">
                {notice.createdBy}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Created By
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Notice Body Content
          </h3>
          <div className="rounded-2xl bg-muted/30 p-6 border text-foreground leading-relaxed whitespace-pre-wrap">
            {notice.content}
          </div>
        </div>
      </div>
    </div>
  );
}
