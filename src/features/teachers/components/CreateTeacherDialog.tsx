"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateTeacherForm from "./CreateTeacherForm";

export default function CreateTeacherDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Teacher</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Teacher</DialogTitle>
        </DialogHeader>

        <CreateTeacherForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
