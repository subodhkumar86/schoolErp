import mongoose, { Schema, models, model } from "mongoose";

const AttendanceSchema = new Schema(
  {
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "entityType",
    },

    entityType: {
      type: String,
      required: true,
      enum: ["Student", "Teacher"],
      default: "Student",
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Leave"],
      required: true,
      default: "Present",
    },

    remarks: {
      type: String,
      default: "",
    },

    markedBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate attendance for same entity on same date
AttendanceSchema.index(
  { entityId: 1, date: 1, entityType: 1 },
  { unique: true },
);

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);

export default Attendance;
