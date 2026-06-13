import { Schema, models, model } from "mongoose";

const TransportSchema = new Schema(
  {
    routeName: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
    },

    driverName: {
      type: String,
      required: true,
      trim: true,
    },

    driverPhone: {
      type: String,
      required: true,
      trim: true,
    },

    routeCost: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
      default: 40,
    },

    status: {
      type: String,
      enum: ["Active", "Maintenance", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

const Transport = models.Transport || model("Transport", TransportSchema);

export default Transport;
