import { Schema, models, model } from "mongoose";

const AdmissionSchema = new Schema(
  {
    studentName: {
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
    appliedClass: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    dateOfBirth: {
      type: Date,
    },
    parentName: {
      type: String,
    },
    parentPhone: {
      type: String,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Admission = models.Admission || model("Admission", AdmissionSchema);

export default Admission;
