"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProfessionPostStore } from "@/stores/userProfessionPostStore";

export default function ProfessionStep2Form() {
  const router = useRouter();
  const { setStep2Data } = useProfessionPostStore();

  const [experienceYears, setExperienceYears] = useState("");
  const [availability, setAvailability] = useState("");
  const [locations, setLocations] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const handleNext = () => {
    setStep2Data({
      experienceYears,
      availability,
      locations,
      portfolio,
    });

    router.push("/create/service/review");
  };

  const handleBack = () => {
    router.push("/create/service/step1");
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-gradient-to-b from-gray-950 to-gray-900"
    >
      <div className="max-w-lg w-full space-y-8 bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Professional Details
          </h1>
          <p className="text-gray-400 text-sm">Step 2 of 2</p>
        </div>

        <div className="space-y-5">
          {/* Experience Years */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Experience (Years)</Label>
            <Input
              type="number"
              placeholder="Enter your total experience in years"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
            />
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Availability</Label>
            <Select onValueChange={setAvailability}>
              <SelectTrigger>
                <SelectValue placeholder="Select availability type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract Basis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Locations</Label>
            <Input
              placeholder="e.g. Mumbai, Remote"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
            />
          </div>

          {/* Portfolio */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Portfolio / Links</Label>
            <Input
              placeholder="Portfolio URL or LinkedIn, GitHub, etc."
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            variant="secondary"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            ← Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white hover:brightness-110 flex items-center gap-2"
          >
            Continue →
          </Button>
        </div>
      </div>
    </motion.main>
  );
}
