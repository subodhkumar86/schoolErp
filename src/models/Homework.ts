import { Schema, models, model } from "mongoose";

const HomeworkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      default: "",
    },

    subject: {
      type: String,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },

    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },

    maxPoints: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  },
);

const Homework = models.Homework || model("Homework", HomeworkSchema);

export default Homework;
