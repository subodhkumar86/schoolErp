"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { noticeSchema, type NoticeFormValues } from "../schemas/noticeSchema";
import { useUpdateNotice } from "../hooks/useUpdateNotice";
import type { NoticeType } from "../types/notice";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditNoticeFormProps {
  notice: NoticeType;
}

export default function EditNoticeForm({ notice }: EditNoticeFormProps) {
  const router = useRouter();
  const updateNotice = useUpdateNotice();

  const formatDateForInput = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeSchema) as unknown as Resolver<NoticeFormValues>,
    defaultValues: {
      title: notice.title || "",
      content: notice.content || "",
      audience: notice.audience || "All",
      postedDate: formatDateForInput(notice.postedDate),
      expiryDate: formatDateForInput(notice.expiryDate),
      status: notice.status || "Active",
      createdBy: notice.createdBy || "Administration",
    },
  });

  const onSubmit = async (data: NoticeFormValues) => {
    try {
      // Map empty expiryDate string to undefined or empty in payload
      const payload = {
        ...data,
        expiryDate: data.expiryDate || undefined,
      };
      await updateNotice.mutateAsync({
        id: notice._id,
        data: payload,
      });
      toast.success("Notice updated successfully");
      router.push(`/notices/${notice._id}`);
    } catch (error) {
      toast.error("Failed to update notice");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl bg-card border rounded-3xl p-8 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Announcement Title</Label>
          <Input
            id="title"
            placeholder="e.g. Annual Sports Day Meet 2026"
            {...register("title")}
            className="mt-1"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="content">Content Body</Label>
          <Textarea
            id="content"
            placeholder="Write details about the notice here..."
            {...register("content")}
            className="mt-1 min-h-[120px]"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="audience">Target Audience</Label>
            <select
              id="audience"
              {...register("audience")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="All">All Students & Teachers</option>
              <option value="Students">Students Only</option>
              <option value="Teachers">Teachers Only</option>
            </select>
            {errors.audience && (
              <p className="mt-1 text-sm text-red-500">{errors.audience.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Publish Status</Label>
            <select
              id="status"
              {...register("status")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="postedDate">Post Date</Label>
            <Input
              id="postedDate"
              type="date"
              {...register("postedDate")}
              className="mt-1"
            />
            {errors.postedDate && (
              <p className="mt-1 text-sm text-red-500">{errors.postedDate.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
            <Input
              id="expiryDate"
              type="date"
              {...register("expiryDate")}
              className="mt-1"
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-500">{errors.expiryDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="createdBy">Posted By (Author)</Label>
          <Input
            id="createdBy"
            placeholder="e.g. Principal's Office"
            {...register("createdBy")}
            className="mt-1"
          />
          {errors.createdBy && (
            <p className="mt-1 text-sm text-red-500">{errors.createdBy.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/notices/${notice._id}`)}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={updateNotice.isPending}
        >
          {updateNotice.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
