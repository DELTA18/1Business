import mongoose, { Schema, model, models } from "mongoose";

const ProfessionPostSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
    type: { type: String, required: true },
    askingPrice: { type: String, required: true },

    experienceYears: { type: String, required: true },
    availability: { type: String, required: true },
    locations: { type: String, required: true },
    portfolio: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProfessionPost =
  models.ProfessionPost || model("ProfessionPost", ProfessionPostSchema);
