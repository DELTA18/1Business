"use client";

import { useRouter } from "next/navigation";
import { useProfessionPostStore } from "@/stores/userProfessionPostStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { useSession } from "next-auth/react";
export default function ProfessionReviewPage() {
  const router = useRouter();
  const { step1Data, step2Data, reset } = useProfessionPostStore();
  const { data: session } = useSession();
  const userId = session?.user?.googleId || session?.user?.id;

  const postData = {
      userId,
      ...step1Data,
      ...step2Data,
    };

    console.log("Submitting post data:", postData);

  const handleSubmit = async () => {
    const postData = {
      userId,
      ...step1Data,
      ...step2Data,
    };

    console.log("Submitting post data:", postData);

    const res = await fetch("/api/service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    if (!res.ok) {
      toast.error("Failed to submit post. Please try again.");
      return;
    }

    toast.success("Profession post submitted successfully!");
    reset();
    const result = await res.json();
    console.log(result, "Response from server", result.success);
    result.success ? router.push("/") : router.push("/createpost/failure");
  };

  if (!step1Data || !step2Data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg font-semibold">
        Missing post data. Please complete previous steps.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 py-20 text-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 tracking-tight"
        >
          Review Your Profession Post
        </motion.h1>

        {/* Review Card */}
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8 md:p-10 space-y-6">
              {/* Step 1 Data */}
              <div className="space-y-4">
                <Detail title="Name" value={step1Data.name} />
                <Detail title="Description" value={step1Data.description} />
                <Detail title="Experience" value={step1Data.experience} />
                <Detail title="Type of Profession" value={step1Data.type} />
                <Detail
                  title="Asking Price"
                  value={`₹ ${step1Data.askingPrice}`}
                />
              </div>

              {/* Step 2 Data */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Detail
                  title="Experience (Years)"
                  value={`${step2Data.experienceYears} years`}
                />
                <Detail title="Availability" value={step2Data.availability} />
                <Detail title="Locations" value={step2Data.locations} />
                <Detail title="Portfolio / Links" value={step2Data.portfolio} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <Button
            variant="outline"
            className="bg-white text-black hover:bg-gray-100 transition-all px-6 py-2 rounded-xl"
            onClick={() => router.push("/create/service/step2")}
          >
            ← Go Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-green-500 via-teal-600 to-blue-600 hover:from-green-600 hover:to-blue-700 transition-all text-white px-6 py-2 rounded-xl"
          >
            🚀 Submit Profession Post
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function Detail({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white/90">{title}</h2>
      <p className="text-white/70">{value}</p>
    </div>
  );
}
