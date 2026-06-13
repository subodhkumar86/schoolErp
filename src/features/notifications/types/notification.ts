export type NotificationTypeEnum = "Info" | "Success" | "Warning" | "Error";
export type NotificationRecipient = "All" | "Students" | "Teachers";
export type NotificationPriority = "Low" | "Normal" | "High";

export interface NotificationType {
  _id: string;
  title: string;
  message: string;
  type: NotificationTypeEnum;
  recipient: NotificationRecipient;
  read: boolean;
  priority: NotificationPriority;
  postedDate: string;
  createdAt: string;
  updatedAt: string;
}
