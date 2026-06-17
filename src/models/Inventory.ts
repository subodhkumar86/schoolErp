import { Schema, models, model } from "mongoose";

const InventorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
      enum: ["Computer", "Electronics", "Furniture", "Other"],
      default: "Other",
    },

    status: {
      type: String,
      enum: ["Active", "Maintenance", "Retired"],
      default: "Active",
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 1,
    },

    costValue: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    purchasedDate: {
      type: Date,
      default: Date.now,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Inventory = models.Inventory || model("Inventory", InventorySchema);

export default Inventory;
