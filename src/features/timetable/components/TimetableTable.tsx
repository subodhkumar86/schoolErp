"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTimetables } from "../hooks/useTimetables";
import { useDeleteTimetable } from "../hooks/useDeleteTimetable";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import TimetableFilters from "./TimetableFilters";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function TimetableTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 10;
  const { data: response, isLoading } = useTimetables({
    search,
    classId: selectedClass,
    teacherId: selectedTeacher,
    dayOfWeek: selectedDay,
    page: currentPage,
    limit,
  });

  const slots = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const deleteSlotMutation = useDeleteTimetable();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteSlotMutation.mutateAsync(deleteId);
      toast.success("Timetable slot deleted successfully");
      setDeleteId(null);
      if (slots.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete timetable slot");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <TimetableFilters
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        selectedClass={selectedClass}
        setSelectedClass={(v) => {
          setSelectedClass(v);
          setCurrentPage(1);
        }}
        selectedTeacher={selectedTeacher}
        setSelectedTeacher={(v) => {
          setSelectedTeacher(v);
          setCurrentPage(1);
        }}
        selectedDay={selectedDay}
        setSelectedDay={(v) => {
          setSelectedDay(v);
          setCurrentPage(1);
        }}
      />

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Classroom</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {slots.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState
                      title="No Timetable Slots Scheduled"
                      description="Create a new schedule allocation slot or adjust filter criteria."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                slots.map((s) => {
                  const classObj = typeof s.classId === "object" ? s.classId : null;
                  const teacherObj = typeof s.teacherId === "object" ? s.teacherId : null;

                  return (
                    <TableRow key={s._id}>
                      <TableCell className="font-semibold text-foreground">
                        {classObj ? `Class ${classObj.name}-${classObj.section}` : "N/A"}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{s.subject}</TableCell>
                      <TableCell>{teacherObj?.name || "N/A"}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {s.dayOfWeek}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {s.startTime} - {s.endTime}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {s.classroom || "No Location"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/timetable/${s._id}`)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/timetable/${s._id}/edit`)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                            onClick={() => setDeleteId(s._id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              nextPage={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              prevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            />
          </div>
        )}
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Timetable Slot</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this scheduled slot from class timetables? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteSlotMutation.isPending}
            >
              {deleteSlotMutation.isPending ? "Removing..." : "Remove"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
