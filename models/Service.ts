import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Core info
  title: { type: String, required: true },
  skills: { type: [String], required: true },
  description: { type: String, required: true },

  // Pricing
  priceModel: { type: String, enum: ["fixed", "hourly"], required: true },
  price: { type: Number, required: true },

  // Availability
  availability: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  location: { type: String, required: true },

  // Portfolio / Media
  portfolio: [{ type: String }],

  // Reputation (derived from Bookings + Reviews)
  rating: { type: Number, default: 0 }, // avg rating
  reviewCount: { type: Number, default: 0 },

  // Service lifecycle
  active: { type: Boolean, default: true },

  // 🔥 Suggested additions
  categories: [{ type: String }], // e.g. "design", "carpentry"
  tags: [{ type: String }],       // for flexible search
  responseTime: { type: String }, // e.g. "within 24 hours"
  completedBookings: { type: Number, default: 0 }, // quick metric
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to auto-update `updatedAt`
ServiceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
