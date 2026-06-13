import { Schema, models, model } from "mongoose";

const ResultSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    marksObtained: {
      type: Number,
      required: true,
    },

    grade: {
      type: String,
      required: true,
      trim: true,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate results for the same student and exam
ResultSchema.index({ studentId: 1, examId: 1 }, { unique: true });

const Result = models.Result || model("Result", ResultSchema);

export default Result;
