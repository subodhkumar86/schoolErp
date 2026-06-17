import { Schema, models, model } from "mongoose";

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    isbn: {
      type: String,
      sparse: true,
      trim: true,
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Mathematics", "Science", "English", "History", "Fiction", "Other"],
      default: "Other",
    },

    totalCopies: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },

    status: {
      type: String,
      enum: ["Available", "Out of Stock", "Reserved"],
      default: "Available",
    },

    shelfLocation: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

BookSchema.index({ schoolId: 1, isbn: 1 }, { unique: true, sparse: true });

const Book = models.Book || model("Book", BookSchema);

export default Book;
