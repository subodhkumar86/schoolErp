"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useDeleteStudent } from "../hooks/useDeleteStudent";

interface DeleteStudentDialogProps {
  studentId: string;
  onClose: () => void;
}

export default function DeleteStudentDialog({
  studentId,
  onClose,
}: DeleteStudentDialogProps) {
  const deleteStudent = useDeleteStudent();

  const handleDelete = async () => {
    try {
      await deleteStudent.mutateAsync(studentId);
      toast.success("Student deleted successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to delete student");
      console.error(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Student</DialogTitle>

          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            student?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteStudent.isPending}
          >
            {deleteStudent.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
