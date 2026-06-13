export interface SettingType {
  _id: string;
  schoolName: string;
  schoolAddress: string;
  schoolEmail: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
  theme: "light" | "dark";
  schoolLogo: string;
  sessionYear: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
