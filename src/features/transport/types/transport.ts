export type TransportStatus = "Active" | "Maintenance" | "Inactive";

export interface TransportType {
  _id: string;
  routeName: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  routeCost: number;
  capacity: number;
  status: TransportStatus;
  createdAt: string;
  updatedAt: string;
}
