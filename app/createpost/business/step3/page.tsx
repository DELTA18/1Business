"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBusinessPostStore } from "@/stores/userBusinessPostStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ReviewPostPage() {
  const router = useRouter();
  const { step1Data, step2Data } = useBusinessPostStore();

  const handleSubmit = async () => {
    const postData = {
      ...step1Data,
      ...step2Data,
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    const result = await res.json();
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] py-12 px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 tracking-tight">
          Review Your Business Post
        </h1>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
          <CardContent className="p-6 md:p-10 space-y-6">
            <div className="space-y-4">
              <Detail title="Business Name" value={step1Data.name} />
              <Detail title="Description" value={step1Data.description} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Detail title="Business Type" value={step1Data.businessType} />
              <Detail title="Stage" value={step1Data.stage} />
              <Detail title="Launch Timeline" value={step1Data.launchTimeline} />
              <Detail title="Estimated Budget" value={`₹ ${step2Data.estimatedBudget}`} />
              <Detail title="Available Money" value={`₹ ${step2Data.availableMoney}`} />
              <Detail
                title="Funding Required"
                value={step2Data.fundingRequired ? "Yes" : "No"}
              />
              {step2Data.fundingRequired && (
                <Detail title="Funding Amount" value={`₹ ${step2Data.fundingAmount}`} />
              )}
            </div>

            {step1Data.imageUrl && (
              <div className="mt-4">
                <img
                  src={step1Data.imageUrl}
                  alt="Uploaded Image"
                  width={800}
                  height={500}
                  className="rounded-lg border border-white/20 shadow-lg"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <Button
            variant="outline"
            className="bg-white text-black hover:bg-gray-100 transition"
            onClick={() => router.push("/createpost/business/step2")}
          >
            ← Go Back
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all text-white px-6 py-2 rounded-xl"
            onClick={handleSubmit}
          >
            🚀 Submit Post
          </Button>
        </div>
      </div>
    </div>
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
