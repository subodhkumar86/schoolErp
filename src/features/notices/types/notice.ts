export type NoticeAudience = "All" | "Students" | "Teachers";

export type NoticeStatus = "Active" | "Archived";

export interface NoticeType {
  _id: string;
  title: string;
  content: string;
  audience: NoticeAudience;
  postedDate: string;
  expiryDate?: string;
  status: NoticeStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
