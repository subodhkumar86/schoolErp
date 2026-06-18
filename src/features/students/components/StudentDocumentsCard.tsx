"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useStudent } from "../hooks/useStudent";
import { useUpdateStudent } from "../hooks/useUpdateStudent";
import Loader from "@/components/shared/Loader";
import { FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface DocumentItem {
  _id?: string;
  name: string;
  status: "Submitted" | "Pending" | "Verified";
  submittedAt?: string;
}

export default function StudentDocumentsCard() {
  const params = useParams();
  const studentId = params.id as string;
  const { data: student, isLoading } = useStudent(studentId);
  const updateStudent = useUpdateStudent();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (isLoading) return <Loader />;
  if (!student) return null;

  // Fallback to default checklist if documents field is missing
  const defaultDocs: DocumentItem[] = [
    { name: "Birth Certificate", status: "Pending" },
    { name: "Transfer Certificate (TC)", status: "Pending" },
    { name: "Previous Report Card", status: "Pending" },
    { name: "Passport Photo", status: "Pending" },
  ];

  const documents: DocumentItem[] = student.documents?.length
    ? student.documents
    : defaultDocs;

  const handleStatusChange = async (docName: string, nextStatus: "Submitted" | "Pending" | "Verified") => {
    try {
      setUpdatingId(docName);
      
      const updatedDocs = documents.map((doc) => {
        if (doc.name === docName) {
          return {
            ...doc,
            status: nextStatus,
            submittedAt: nextStatus !== "Pending" ? new Date().toISOString() : undefined,
          };
        }
        return doc;
      });

      // Prepare payload - we keep all original student fields and modify documents
      await updateStudent.mutateAsync({
        id: studentId,
        data: {
          ...student,
          documents: updatedDocs,
        },
      });

      toast.success(`Updated ${docName} to ${nextStatus}`);
    } catch (error) {
      toast.error(`Failed to update ${docName}`);
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          Enrollment Documents
        </h3>
        <span className="text-xs text-muted-foreground font-medium">
          Verify physical / digital copies
        </span>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => {
          const isSubmitted = doc.status === "Submitted";
          const isVerified = doc.status === "Verified";

          return (
            <div
              key={doc.name}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl border bg-slate-50/50 dark:bg-slate-900/30 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {isVerified ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : isSubmitted ? (
                    <Clock className="h-5 w-5 text-blue-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{doc.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {doc.submittedAt
                      ? `Updated on ${new Date(doc.submittedAt).toLocaleDateString()}`
                      : "No submission date recorded"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {updatingId === doc.name ? (
                  <span className="text-xs text-muted-foreground animate-pulse">Saving...</span>
                ) : (
                  <select
                    value={doc.status}
                    onChange={(e) =>
                      handleStatusChange(
                        doc.name,
                        e.target.value as "Submitted" | "Pending" | "Verified"
                      )
                    }
                    className="h-8 rounded-lg border bg-background px-2 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Pending">🔴 Pending</option>
                    <option value="Submitted">🟡 Submitted</option>
                    <option value="Verified">🟢 Verified</option>
                  </select>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
