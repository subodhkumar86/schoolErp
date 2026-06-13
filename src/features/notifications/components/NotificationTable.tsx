"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "../hooks/useNotifications";
import { useDeleteNotification } from "../hooks/useDeleteNotification";
import { useUpdateNotification } from "../hooks/useUpdateNotification";

import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import NotificationFilters from "./NotificationFilters";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function NotificationTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [selectedRead, setSelectedRead] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 10;
  const { data: response, isLoading } = useNotifications({
    search,
    type: selectedType,
    recipient: selectedRecipient,
    read: selectedRead,
    page: currentPage,
    limit,
  });

  const notifications = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const deleteNotificationMutation = useDeleteNotification();
  const markAsReadMutation = useUpdateNotification();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteNotificationMutation.mutateAsync(deleteId);
      toast.success("Notification deleted successfully");
      setDeleteId(null);
      if (notifications.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      }
    } catch {
      toast.error("Failed to delete notification");
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsReadMutation.mutateAsync({
        id,
        data: { read: true },
      });
      toast.success("Notification marked as read");
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <NotificationFilters
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        selectedType={selectedType}
        setSelectedType={(v) => {
          setSelectedType(v);
          setCurrentPage(1);
        }}
        selectedRecipient={selectedRecipient}
        setSelectedRecipient={(v) => {
          setSelectedRecipient(v);
          setCurrentPage(1);
        }}
        selectedRead={selectedRead}
        setSelectedRead={(v) => {
          setSelectedRead(v);
          setCurrentPage(1);
        }}
      />

      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Notification Title</TableHead>
                <TableHead>Severity / Type</TableHead>
                <TableHead>Target Recipient</TableHead>
                <TableHead>Alert Priority</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Read Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {notifications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState
                      title="No Notifications Found"
                      description="Broadcast a new system alert or search another parameter."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                notifications.map((n) => (
                  <TableRow key={n._id}>
                    <TableCell className="font-semibold text-foreground max-w-[220px] truncate">
                      {n.title}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          n.type === "Success"
                            ? "bg-green-500/20 text-green-600"
                            : n.type === "Warning"
                              ? "bg-orange-500/20 text-orange-600"
                              : n.type === "Error"
                                ? "bg-red-500/20 text-red-600"
                                : "bg-blue-500/20 text-blue-600"
                        }`}
                      >
                        {n.type}
                      </span>
                    </TableCell>
                    <TableCell>{n.recipient}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium text-xs ${
                          n.priority === "High"
                            ? "text-red-500 font-bold"
                            : n.priority === "Low"
                              ? "text-muted-foreground"
                              : "text-foreground"
                        }`}
                      >
                        {n.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(n.postedDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          n.read
                            ? "bg-muted text-muted-foreground"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {n.read ? "Read" : "Unread"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {!n.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMarkAsRead(n._id)}
                            title="Mark as Read"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600 hover:text-green-700" />
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/notifications/${n._id}`)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/notifications/${n._id}/edit`)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                          onClick={() => setDeleteId(n._id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
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
            <DialogTitle>Delete System Alert</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this notification? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteNotificationMutation.isPending}
            >
              {deleteNotificationMutation.isPending ? "Removing..." : "Remove"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
