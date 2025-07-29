import mongoose,  { Schema, model, models } from "mongoose";

const BusinessPostSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    businessType: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stage: { type: String, required: true },
    launchTimeline: { type: String, required: true },
    estimatedBudget: { type: String, required: true },
    availableMoney: { type: String, required: true },
    fundingRequired: { type: Boolean, default: false },
    fundingAmount: { type: String, required: false },
  },
  { timestamps: true }
);

const BusinessPost =
  models.BusinessPost || model("BusinessPost", BusinessPostSchema);

export default BusinessPost;
