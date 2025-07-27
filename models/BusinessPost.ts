import mongoose from "mongoose";

const BusinessPostSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    businessType: String,
    imageUrl: String,
    stage: String,
    launchTimeline: String,
    estimatedBudget: String,
    availableMoney: String,
    fundingRequired: Boolean,
    fundingAmount: String,
  },
  { timestamps: true }
);

export default mongoose.models.BusinessPost ||
  mongoose.model("BusinessPost", BusinessPostSchema);
