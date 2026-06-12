"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TeacherSearch({ value, onChange }: Props) {
  return (
    <Input
      placeholder="Search teachers..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
