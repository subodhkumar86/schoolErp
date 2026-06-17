"use client";

/**
 * Trigger browser download of CSV from JSON data.
 */
export function exportToCSV(
  filename: string,
  headers: string[],
  data: Record<string, any>[],
  keys: string[]
) {
  try {
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        keys
          .map((key) => {
            const val = row[key] ?? "";
            const str = typeof val === "object" ? JSON.stringify(val) : String(val);
            return `"${str.replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting to CSV:", error);
  }
}
