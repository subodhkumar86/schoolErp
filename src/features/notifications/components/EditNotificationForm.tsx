"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { notificationSchema, type NotificationFormValues } from "../schemas/notificationSchema";
import { useUpdateNotification } from "../hooks/useUpdateNotification";
import type { NotificationType } from "../types/notification";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditNotificationFormProps {
  notification: NotificationType;
}

export default function EditNotificationForm({ notification }: EditNotificationFormProps) {
  const router = useRouter();
  const updateNotification = useUpdateNotification();

  const formatDateForInput = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema) as unknown as Resolver<NotificationFormValues>,
    defaultValues: {
      title: notification.title || "",
      message: notification.message || "",
      type: notification.type || "Info",
      recipient: notification.recipient || "All",
      read: notification.read || false,
      priority: notification.priority || "Normal",
      postedDate: formatDateForInput(notification.postedDate),
    },
  });

  const onSubmit = async (data: NotificationFormValues) => {
    try {
      await updateNotification.mutateAsync({
        id: notification._id,
        data,
      });
      toast.success("Notification updated successfully");
      router.push(`/notifications/${notification._id}`);
    } catch (error) {
      toast.error("Failed to update notification");
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
          <Label htmlFor="title">Notification Title</Label>
          <Input
            id="title"
            placeholder="e.g. Fee Due Reminder"
            {...register("title")}
            className="mt-1"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message">Message Body</Label>
          <Textarea
            id="message"
            placeholder="Write details of the notification alert..."
            {...register("message")}
            className="mt-1 min-h-[100px]"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="type">Notification Type</Label>
            <select
              id="type"
              {...register("type")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Info">Info</option>
              <option value="Success">Success</option>
              <option value="Warning">Warning</option>
              <option value="Error">Error</option>
            </select>
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              {...register("priority")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="recipient">Recipient Group</Label>
            <select
              id="recipient"
              {...register("recipient")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="All">All Users</option>
              <option value="Students">Students Only</option>
              <option value="Teachers">Teachers Only</option>
            </select>
          </div>

          <div>
            <Label htmlFor="postedDate">Date Sent</Label>
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
        </div>

        <div className="flex items-center gap-2">
          <input
            id="read"
            type="checkbox"
            {...register("read")}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="read" className="cursor-pointer">
            Mark notification as read
          </Label>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/notifications/${notification._id}`)}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={updateNotification.isPending}
        >
          {updateNotification.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
