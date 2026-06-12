import "./globals.css";
import type { Metadata } from "next";

import AppProvider from "@/providers/AppProvider";

export const metadata: Metadata = {
  title: "EduFlow ERP",
  description: "Modern School ERP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
