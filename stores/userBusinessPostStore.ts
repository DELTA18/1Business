
import { create } from "zustand";

type Step1Data = {
  name: string;
  description: string;
  businessType: string;
  image: File | null;
  stage: string;
  launchTimeline: string;
};

type Step2Data = {
  estimatedBudget: string;
  availableMoney: string;
  fundingRequired: boolean;
  fundingAmount: string;
};

type BusinessPostStore = {
  step1Data: Step1Data;
  setStep1Data: (data: Step1Data) => void;

  step2Data: Step2Data;
  setStep2Data: (data: Step2Data) => void;

  reset: () => void;
};

export const useBusinessPostStore = create<BusinessPostStore>((set) => ({
  step1Data: {
    name: "",
    description: "",
    businessType: "",
    image: null,
    stage: "",
    launchTimeline: "",
  },
  step2Data: {
    estimatedBudget: "",
    availableMoney: "",
    fundingRequired: false,
    fundingAmount: "",
  },
  setStep1Data: (data) => set({ step1Data: data }),
  setStep2Data: (data) => set({ step2Data: data }),
  reset: () =>
    set({
      step1Data: {
        name: "",
        description: "",
        businessType: "",
        image: null,
        stage: "",
        launchTimeline: "",
      },
      step2Data: {
        estimatedBudget: "",
        availableMoney: "",
        fundingRequired: false,
        fundingAmount: "",
      },
    }),
}));
