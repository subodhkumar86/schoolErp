"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useDeleteTeacher } from "../hooks/useDeleteTeacher";

interface Props {
  teacherId: string;
}

export default function DeleteTeacherDialog({ teacherId }: Props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const deleteTeacher = useDeleteTeacher();

  const handleDelete = async () => {
    try {
      await deleteTeacher.mutateAsync(teacherId);

      toast.success("Teacher deleted successfully");

      router.push("/teachers");
    } catch {
      toast.error("Failed to delete teacher");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Teacher</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Teacher</DialogTitle>

          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
