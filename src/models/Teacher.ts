import mongoose, { Schema, models, model } from "mongoose";

const TeacherSchema = new Schema(
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

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    department: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
    },

    experience: {
      type: Number,
      default: 0,
    },

    salary: {
      type: Number,
      default: 0,
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    address: {
      type: String,
    },

    profileImage: {
      type: String,
      default: "",
    },

    subjects: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

const Teacher = models.Teacher || model("Teacher", TeacherSchema);

export default Teacher;
