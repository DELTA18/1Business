import { create } from "zustand";

type Step1Data = {
  name: string;
  description: string;
  experience: string;
  type: string;
  askingPrice: string;
};

type Step2Data = {
  experienceYears: string;
  availability: string;
  locations: string;
  portfolio: string;
};

type ProfessionPostStore = {
  step1Data: Step1Data | null;
  step2Data: Step2Data | null;
  setStep1Data: (data: Step1Data) => void;
  setStep2Data: (data: Step2Data) => void;
  reset: () => void;
};

export const useProfessionPostStore = create<ProfessionPostStore>((set) => ({
  step1Data: null,
  step2Data: null,
  setStep1Data: (data) => set({ step1Data: data }),
  setStep2Data: (data) => set({ step2Data: data }),
  reset: () => set({ step1Data: null, step2Data: null }),
}));
