import mongoose from "mongoose";
import { title } from "process";

const ServiceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    skills: { type: [String], required: true },
    description: { type: String, required: true },
    priceModel: { type: String, enum: ["fixed", "hourly"], required: true },
    price: { type: Number, required: true },
    availability: { type: String, enum: ["available", "unavailable"], default: "available" },
    location: { type: String, required: true },
    portfolio: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
})

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);