"use client";

import { useState } from "react";
import axios from "axios";
import { useMe } from "@/features/auth/hooks/useMe";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  CheckCircle2,
  XCircle,
  Play,
  Loader2,
  Activity,
  Server,
} from "lucide-react";
import { toast } from "sonner";

interface TestResult {
  suite: string;
  name: string;
  status: "passed" | "failed";
  durationMs: number;
  message?: string;
}

interface TestResponse {
  success: boolean;
  summary: {
    total: number;
    passed: number;
    failed: number;
    durationMs: number;
  };
  results: TestResult[];
}

export default function SystemDiagnostics() {
  const { user, isLoading: loadingUser } = useMe();
  const [running, setRunning] = useState(false);
  const [data, setData] = useState<TestResponse | null>(null);

  if (loadingUser) {
    return (
      <Card className="rounded-3xl border bg-card p-6">
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  // Only expose system diagnostics to Super Admin or Admin
  if (user?.role !== "Super Admin" && user?.role !== "Admin") {
    return null;
  }

  const runDiagnostics = async () => {
    setRunning(true);
    setData(null);
    try {
      const response = await axios.get<TestResponse>("/api/system/tests");
      setData(response.data);
      if (response.data.success) {
        toast.success("System diagnostics check completed. All checks passed!");
      } else {
        toast.error(`System diagnostics completed with ${response.data.summary.failed} errors.`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while running diagnostic checks.");
      console.error(error);
    } finally {
      setRunning(false);
    }
  };

  return (
    <Card className="rounded-3xl border bg-card shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b p-6 bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-500">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">System Diagnostics & Test Center</CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Verify database connection integrity, schema constraints, validation flows, and crypto operations
            </CardDescription>
          </div>
        </div>
        <Button
          onClick={runDiagnostics}
          disabled={running}
          className="rounded-xl flex items-center gap-2 self-start sm:self-center font-semibold"
        >
          {running ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Running Diagnostics...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              Run Diagnostics
            </>
          )}
        </Button>
      </div>

      <CardContent className="p-6">
        {!data && !running && (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-2xl bg-muted/10 p-4">
            <Server className="h-12 w-12 text-muted-foreground/60 mb-3" />
            <h3 className="font-semibold text-base text-foreground">No Diagnostic Data</h3>
            <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-4">
              Click the button above to execute the suite of smoke, validation, and database operations.
            </p>
          </div>
        )}

        {running && (
          <div className="flex flex-col items-center justify-center py-12 text-center p-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
            <h3 className="font-semibold text-base">Running Suite</h3>
            <p className="text-xs text-muted-foreground max-w-sm mt-1">
              Connecting to database, testing Zod schemas, verifying bcrypt hashing and JWT tokens...
            </p>
          </div>
        )}

        {data && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Stats Cards */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              <div className="rounded-2xl border bg-card p-4 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-muted-foreground font-medium">Total Runs</span>
                <span className="text-2xl font-extrabold mt-1">{data.summary.total}</span>
              </div>
              <div className="rounded-2xl border bg-card p-4 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-muted-foreground font-medium">Passed Checks</span>
                <span className="text-2xl font-extrabold text-green-500 mt-1">{data.summary.passed}</span>
              </div>
              <div className="rounded-2xl border bg-card p-4 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-muted-foreground font-medium">Failed Checks</span>
                <span className="text-2xl font-extrabold text-red-500 mt-1">{data.summary.failed}</span>
              </div>
              <div className="rounded-2xl border bg-card p-4 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-muted-foreground font-medium">Execution Time</span>
                <span className="text-2xl font-extrabold mt-1 flex items-center gap-1">
                  {data.summary.durationMs}
                  <span className="text-xs text-muted-foreground font-normal">ms</span>
                </span>
              </div>
            </div>

            {/* Test Results Table */}
            <div className="border rounded-2xl overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[180px]">Test Suite</TableHead>
                    <TableHead>Test Case</TableHead>
                    <TableHead className="w-[120px]">Duration</TableHead>
                    <TableHead className="w-[120px] text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.results.map((test, index) => (
                    <TableRow key={index} className="hover:bg-muted/10">
                      <TableCell className="font-semibold text-xs text-muted-foreground">
                        {test.suite}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-foreground">{test.name}</span>
                          {test.message && (
                            <span className="text-xs text-red-500 mt-1 leading-relaxed bg-red-500/5 border border-red-500/20 p-2 rounded-lg font-mono">
                              {test.message}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono">
                        {test.durationMs}ms
                      </TableCell>
                      <TableCell className="text-right">
                        {test.status === "passed" ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 rounded-lg py-0.5 px-2 hover:bg-green-500/15">
                            <CheckCircle2 className="h-3 w-3 mr-1 inline-block" />
                            Passed
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 rounded-lg py-0.5 px-2 hover:bg-red-500/15">
                            <XCircle className="h-3 w-3 mr-1 inline-block" />
                            Failed
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
