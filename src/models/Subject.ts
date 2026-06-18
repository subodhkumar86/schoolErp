import { Schema, models, model } from "mongoose";

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Theory", "Practical", "Both"],
      default: "Theory",
    },

    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Unique subject code per school
SubjectSchema.index({ schoolId: 1, code: 1 }, { unique: true });

const Subject = models.Subject || model("Subject", SubjectSchema);

export default Subject;
