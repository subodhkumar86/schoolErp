"use client";

import ThemeProvider from "./ThemeProvider";
import QueryProvider from "./QueryProvider";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
