"use client";

import { useState } from "react";

export function useStudentSearch() {
  const [search, setSearch] = useState("");

  return {
    search,
    setSearch,
  };
}
