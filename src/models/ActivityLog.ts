import { Schema, models, model } from "mongoose";

const ActivityLogSchema = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    details: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Indexes for fast lookups by tenant and date
ActivityLogSchema.index({ schoolId: 1, createdAt: -1 });

const ActivityLog = models.ActivityLog || model("ActivityLog", ActivityLogSchema);

export default ActivityLog;
