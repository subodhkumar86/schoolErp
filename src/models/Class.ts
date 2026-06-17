import { Schema, models, model } from "mongoose";

const ClassSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
    },

    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    classTeacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },

    capacity: {
      type: Number,
      default: 40,
    },

    subjects: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

ClassSchema.index({ schoolId: 1, name: 1, section: 1 }, { unique: true });

const Class = models.Class || model("Class", ClassSchema);

export default Class;
