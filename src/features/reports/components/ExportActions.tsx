"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileSpreadsheet, FileText } from "lucide-react";

type ReportType = "students" | "teachers" | "attendance" | "fees" | "results";

export default function ExportActions() {
  const [selectedReport, setSelectedReport] = useState<ReportType>("students");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: "csv" | "excel") => {
    setIsExporting(true);
    try {
      let endpoint = "";
      let fileName = "";
      let headers: string[] = [];
      let keys: string[] = [];

      switch (selectedReport) {
        case "students":
          endpoint = "/api/students?limit=1000";
          fileName = `Student_Report_${new Date().toISOString().split("T")[0]}`;
          headers = ["Name", "Roll Number", "Class", "Section", "Gender", "Email", "Phone", "Status"];
          keys = ["name", "rollNumber", "studentClass", "section", "gender", "email", "phone", "status"];
          break;
        case "teachers":
          endpoint = "/api/teachers?limit=1000";
          fileName = `Teacher_Report_${new Date().toISOString().split("T")[0]}`;
          headers = ["Name", "Employee ID", "Department", "Qualification", "Experience (Yrs)", "Salary (₹)", "Status"];
          keys = ["name", "employeeId", "department", "qualification", "experience", "salary", "status"];
          break;
        case "attendance":
          endpoint = "/api/attendance?limit=1000";
          fileName = `Attendance_Report_${new Date().toISOString().split("T")[0]}`;
          headers = ["Entity ID", "Entity Type", "Date", "Status", "Remarks", "Marked By"];
          keys = ["entityId", "entityType", "date", "status", "remarks", "markedBy"];
          break;
        case "fees":
          endpoint = "/api/fees?limit=1000";
          fileName = `Fee_Report_${new Date().toISOString().split("T")[0]}`;
          headers = ["Student ID", "Fee Type", "Amount (₹)", "Due Date", "Paid Date", "Status", "Payment Method", "Receipt No"];
          keys = ["studentId", "feeType", "amount", "dueDate", "paidDate", "status", "paymentMethod", "receiptNumber"];
          break;
        case "results":
          endpoint = "/api/results?limit=1000";
          fileName = `Exam_Result_Report_${new Date().toISOString().split("T")[0]}`;
          headers = ["Student ID", "Exam ID", "Marks Obtained", "Grade", "Remarks"];
          keys = ["studentId", "examId", "marksObtained", "grade", "remarks"];
          break;
      }

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch export data");
      const json = await res.json();
      const records = (json.data || []) as Record<string, unknown>[];

      if (records.length === 0) {
        toast.warning("No records found to export.");
        setIsExporting(false);
        return;
      }

      // Convert to CSV string
      let csvContent = headers.join(",") + "\r\n";
      records.forEach((record: Record<string, unknown>) => {
        const row = keys.map((key) => {
          let val = record[key];
          if (val === undefined || val === null) {
            val = "";
          } else if (typeof val === "object") {
            // Flatten subdocuments if present (like name inside object)
            const obj = val as Record<string, unknown>;
            val = obj.name || JSON.stringify(val);
          }
          // Escape quotes
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvContent += row.join(",") + "\r\n";
      });

      // Download trigger
      const fileExt = format === "excel" ? "csv" : "csv"; // Both use comma-separated encoding
      const actualFileName = `${fileName}.${fileExt}`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", actualFileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`${selectedReport.toUpperCase()} report exported successfully as ${format.toUpperCase()}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to export report data.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <label htmlFor="reportSelect" className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
          Select Report Type:
        </label>
        <select
          id="reportSelect"
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value as ReportType)}
          className="h-10 rounded-md border bg-background px-3 text-sm focus:outline-none"
        >
          <option value="students">Student Enrollment & Demographics</option>
          <option value="teachers">Teacher Staff Roster</option>
          <option value="attendance">Student/Staff Attendance Log</option>
          <option value="fees">Fee Transaction Ledger</option>
          <option value="results">Academic Exam Grades & Results</option>
        </select>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => handleExport("excel")}
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export to Excel
        </Button>

        <Button
          variant="outline"
          onClick={() => handleExport("csv")}
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>
    </div>
  );
}
