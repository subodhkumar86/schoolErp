import mongoose, { Schema, models, model } from "mongoose";

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },

    studentClass: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      default: "A",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    dateOfBirth: {
      type: Date,
    },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    address: {
      type: String,
    },

    parentName: {
      type: String,
    },

    parentPhone: {
      type: String,
    },

    profileImage: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    attendance: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  },
);

const Student = models.Student || model("Student", StudentSchema);

export default Student;
