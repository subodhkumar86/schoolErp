export type BookCategory =
  | "Mathematics"
  | "Science"
  | "English"
  | "History"
  | "Fiction"
  | "Other";

export type BookStatus = "Available" | "Out of Stock" | "Reserved";

export interface BookType {
  _id: string;
  title: string;
  author: string;
  isbn?: string;
  category: BookCategory;
  totalCopies: number;
  availableCopies: number;
  status: BookStatus;
  shelfLocation?: string;
  createdAt: string;
  updatedAt: string;
}
