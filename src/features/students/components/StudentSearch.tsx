"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function StudentSearch({ value, onChange }: Props) {
  return (
    <Input
      placeholder="Search students..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
