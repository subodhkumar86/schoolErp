export type DayOfWeekType = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface TimetableSlotType {
  _id: string;
  classId: {
    _id: string;
    name: string;
    section: string;
  } | string;
  subject: string;
  teacherId: {
    _id: string;
    name: string;
  } | string;
  dayOfWeek: DayOfWeekType;
  startTime: string;
  endTime: string;
  classroom?: string;
  createdAt: string;
  updatedAt: string;
}
