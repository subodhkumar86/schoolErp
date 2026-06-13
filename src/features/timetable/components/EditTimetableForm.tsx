"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { timetableSchema, type TimetableFormValues } from "../schemas/timetableSchema";
import { useUpdateTimetable } from "../hooks/useUpdateTimetable";
import { useClasses } from "@/features/classes/hooks/useClasses";
import { useTeachers } from "@/features/teachers/hooks/useTeachers";
import type { TimetableSlotType } from "../types/timetable";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Loader from "@/components/shared/Loader";

interface EditTimetableFormProps {
  slot: TimetableSlotType;
}

export default function EditTimetableForm({ slot }: EditTimetableFormProps) {
  const router = useRouter();
  const updateSlot = useUpdateTimetable();
  const { data: classesRes, isLoading: classesLoading } = useClasses({ limit: 1000 });
  const { data: teachersRes, isLoading: teachersLoading } = useTeachers({ limit: 1000 });

  const classIdVal = typeof slot.classId === "object" ? slot.classId._id : slot.classId;
  const teacherIdVal = typeof slot.teacherId === "object" ? slot.teacherId._id : slot.teacherId;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimetableFormValues>({
    resolver: zodResolver(timetableSchema) as unknown as Resolver<TimetableFormValues>,
    defaultValues: {
      classId: classIdVal || "",
      subject: slot.subject || "",
      teacherId: teacherIdVal || "",
      dayOfWeek: slot.dayOfWeek || "Monday",
      startTime: slot.startTime || "",
      endTime: slot.endTime || "",
      classroom: slot.classroom || "",
    },
  });

  const onSubmit = async (data: TimetableFormValues) => {
    try {
      await updateSlot.mutateAsync({
        id: slot._id,
        data,
      });
      toast.success("Timetable slot details updated successfully");
      router.push(`/timetable/${slot._id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update slot details");
      console.error(error);
    }
  };

  if (classesLoading || teachersLoading) {
    return <Loader />;
  }

  const classes = classesRes?.data ?? [];
  const teachers = teachersRes?.data ?? [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-xl bg-card border rounded-3xl p-8 shadow-sm"
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="classId">Class</Label>
            <select
              id="classId"
              {...register("classId")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="">Select a Class</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  Class {c.name}-{c.section}
                </option>
              ))}
            </select>
            {errors.classId && (
              <p className="mt-1 text-sm text-red-500">{errors.classId.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g. Mathematics"
              {...register("subject")}
              className="mt-1"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="teacherId">Teacher</Label>
            <select
              id="teacherId"
              {...register("teacherId")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="">Select a Teacher</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.teacherId && (
              <p className="mt-1 text-sm text-red-500">{errors.teacherId.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="dayOfWeek">Day of Week</Label>
            <select
              id="dayOfWeek"
              {...register("dayOfWeek")}
              className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            {errors.dayOfWeek && (
              <p className="mt-1 text-sm text-red-500">{errors.dayOfWeek.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              {...register("startTime")}
              className="mt-1"
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-500">{errors.startTime.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              {...register("endTime")}
              className="mt-1"
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-500">{errors.endTime.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="classroom">Classroom / Room No. (Optional)</Label>
          <Input
            id="classroom"
            placeholder="e.g. Room 204 or Lab 1"
            {...register("classroom")}
            className="mt-1"
          />
          {errors.classroom && (
            <p className="mt-1 text-sm text-red-500">{errors.classroom.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/timetable/${slot._id}`)}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={updateSlot.isPending}
        >
          {updateSlot.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
