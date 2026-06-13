import { Schema, models, model } from "mongoose";

const NoticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    audience: {
      type: String,
      enum: ["All", "Students", "Teachers"],
      default: "All",
    },

    postedDate: {
      type: Date,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Active", "Archived"],
      default: "Active",
    },

    createdBy: {
      type: String,
      required: true,
      default: "Administration",
    },
  },
  {
    timestamps: true,
  },
);

const Notice = models.Notice || model("Notice", NoticeSchema);

export default Notice;
