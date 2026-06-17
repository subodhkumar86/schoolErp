import { Schema, models, model } from "mongoose";

const SettingSchema = new Schema(
  {
    schoolName: {
      type: String,
      required: true,
      default: "EduFlow Public School",
      trim: true,
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    schoolAddress: {
      type: String,
      required: true,
      default: "New Delhi",
      trim: true,
    },
    schoolEmail: {
      type: String,
      required: true,
      default: "info@eduflow.com",
      trim: true,
      lowercase: true,
    },
    schoolLogo: {
      type: String,
      default: "/images/logo.png",
    },
    sessionYear: {
      type: String,
      required: true,
      default: "2026-2027",
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    smsNotifications: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "English",
    },
    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
    dateFormat: {
      type: String,
      default: "DD/MM/YYYY",
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
  },
  {
    timestamps: true,
  }
);

const Setting = models.Setting || model("Setting", SettingSchema);

export default Setting;
