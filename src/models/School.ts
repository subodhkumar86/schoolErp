import { Schema, models, model } from "mongoose";

const SchoolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    subscription: {
      plan: {
        type: String,
        enum: ["Starter", "Professional", "Enterprise"],
        default: "Starter",
      },
      status: {
        type: String,
        enum: ["Trial", "Active", "Past Due", "Cancelled", "Expired"],
        default: "Trial",
      },
      trialEndsAt: {
        type: Date,
        default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
      },
      endsAt: {
        type: Date,
      },
      limitStudents: {
        type: Number,
        default: 100, // Limit for Starter plan
      },
      limitTeachers: {
        type: Number,
        default: 10, // Limit for Starter plan
      },
    },
  },
  {
    timestamps: true,
  }
);

const School = models.School || model("School", SchoolSchema);

export default School;
