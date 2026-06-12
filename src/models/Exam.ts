import mongoose, { Schema, models, model } from "mongoose";

const ExamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    section: {
      type: String,
    },

    date: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number, // in minutes
      default: 60,
    },

    totalMarks: {
      type: Number,
      default: 100,
    },

    passingMarks: {
      type: Number,
      default: 35,
    },

    status: {
      type: String,
      enum: ["Scheduled", "Ongoing", "Completed", "Cancelled"],
      default: "Scheduled",
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Exam = models.Exam || model("Exam", ExamSchema);

export default Exam;
