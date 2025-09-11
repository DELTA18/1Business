import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Core info
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String }],

  // Pricing
  priceModel: { type: String, enum: ["fixed", "hourly"], required: true },
  price: { type: Number, required: true },

  // Basic meta
  location: { type: String },
  availability: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
