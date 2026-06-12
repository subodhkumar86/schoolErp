"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AttendanceTable from "./AttendanceTable";
import TeacherAttendanceTable from "./TeacherAttendanceTable";

export default function AttendanceTabs() {
  return (
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="students">Student Attendance</TabsTrigger>

        <TabsTrigger value="teachers">Teacher Attendance</TabsTrigger>
      </TabsList>

      <TabsContent value="students" className="mt-6">
        <AttendanceTable />
      </TabsContent>

      <TabsContent value="teachers" className="mt-6">
        <TeacherAttendanceTable />
      </TabsContent>
    </Tabs>
  );
}
