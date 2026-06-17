import { Schema, models, model } from "mongoose";

const FeeSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    feeType: {
      type: String,
      enum: [
        "Tuition",
        "Transport",
        "Library",
        "Hostel",
        "Exam",
        "Sports",
        "Other",
      ],
      required: true,
      default: "Tuition",
    },

    amount: {
      type: Number,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    paidDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue", "Partial"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Online", "Cheque", "DD"],
    },

    remarks: {
      type: String,
      default: "",
    },

    receiptNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Fee = models.Fee || model("Fee", FeeSchema);

export default Fee;
