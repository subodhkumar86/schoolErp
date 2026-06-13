export type AssetCategory = "Computer" | "Electronics" | "Furniture" | "Other";

export type AssetStatus = "Active" | "Maintenance" | "Retired";

export interface InventoryType {
  _id: string;
  name: string;
  category: AssetCategory;
  status: AssetStatus;
  quantity: number;
  costValue: number;
  purchasedDate?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}
