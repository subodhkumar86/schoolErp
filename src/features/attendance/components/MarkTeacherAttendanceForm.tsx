"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { useTeachers } from "@/features/teachers/hooks/useTeachers";
import { useCreateAttendance } from "../hooks/useCreateAttendance";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  entityId: z.string().min(1, "Please select a teacher"),
  entityType: z.literal("Teacher"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Present", "Absent", "Late", "Leave"]),
  remarks: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
}

export default function MarkTeacherAttendanceForm({ onSuccess }: Props) {
  const { data: teachersRes } = useTeachers({ limit: 200 });
  const teachers = teachersRes?.data ?? [];

  const createAttendance = useCreateAttendance();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      entityId: "",
      entityType: "Teacher",
      date: new Date().toISOString().split("T")[0],
      status: "Present",
      remarks: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createAttendance.mutateAsync(data);
      toast.success("Teacher attendance marked successfully");
      reset();
      onSuccess?.();
    } catch {
      toast.error("Failed to mark teacher attendance");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Teacher</Label>
        <select
          className="mt-2 w-full rounded-md border bg-background p-2"
          {...register("entityId")}
        >
          <option value="">Select Teacher</option>
          {(teachers as Array<{ _id: string; name: string }>).map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
        {errors.entityId && (
          <p className="mt-1 text-sm text-red-500">{errors.entityId.message}</p>
        )}
      </div>

      <div>
        <Label>Date</Label>
        <Input type="date" className="mt-2" {...register("date")} />
        {errors.date && (
          <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      <div>
        <Label>Status</Label>
        <select
          className="mt-2 w-full rounded-md border bg-background p-2"
          {...register("status")}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
          <option value="Leave">Leave</option>
        </select>
      </div>

      <div>
        <Label>Remarks</Label>
        <Input
          className="mt-2"
          placeholder="Optional remarks"
          {...register("remarks")}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createAttendance.isPending}
      >
        {createAttendance.isPending ? "Saving..." : "Save Attendance"}
      </Button>
    </form>
  );
}
