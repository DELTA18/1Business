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
  if (!step1Data || !step2Data) return;

  const formData = new FormData();

  const postData = {
    name: step1Data.name,
    description: step1Data.description,
    businessType: step1Data.businessType,
    stage: step1Data.stage,
    launchTimeline: step1Data.launchTimeline,
    estimatedBudget: step2Data.estimatedBudget,
    availableMoney: step2Data.availableMoney,
    fundingRequired: step2Data.fundingRequired,
    fundingAmount: step2Data.fundingAmount,
  };

  formData.append("json", JSON.stringify(postData));
  if (step1Data.image) {
    formData.append("image", step1Data.image);
  }

  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (result.success) {
      alert("Post submitted successfully!");
      router.push("/"); // or redirect to posts list
    } else {
      alert("Failed to submit post");
    }
  } catch (err) {
    console.error(err);
    alert("Error submitting post");
  }
};


  if (!step1Data || !step2Data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Missing post data. Please complete previous steps.
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-200 bg-gradient-to-br from-black via-zinc-900 to-neutral-800 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl p-10 font-bold mb-8 text-center">Review Your Business Post</h1>

        <Card className="bg-zinc-950 border border-zinc-800 mb-6 shadow-xl">
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-200">Business Name</h2>
              <p className="text-gray-200">{step1Data.name}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-200">Description</h2>
              <p className="text-gray-200">{step1Data.description}</p>
            </div>

            <div className=" text-gray-200 grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold">Business Type</h2>
                <p>{step1Data.businessType}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Stage</h2>
                <p>{step1Data.stage}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Launch Timeline</h2>
                <p>{step1Data.launchTimeline}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Estimated Budget</h2>
                <p>₹ {step2Data.estimatedBudget}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Available Money</h2>
                <p>₹ {step2Data.availableMoney}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Funding Required</h2>
                <p>{step2Data.fundingRequired ? "Yes" : "No"}</p>
              </div>
              {step2Data.fundingRequired && (
                <div>
                  <h2 className="text-xl font-semibold">Funding Amount</h2>
                  <p>₹ {step2Data.fundingAmount}</p>
                </div>
              )}
            </div>

            {step1Data.image && (
              <div>
                <h2 className="text-xl font-semibold">Uploaded Image</h2>
                <Image
                  src={URL.createObjectURL(step1Data.image)}
                  alt="Business"
                  width={400}
                  height={300}
                  className="rounded-lg border border-zinc-800"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between items-center gap-4">
          <Button variant="outline" className=" text-gray-900" onClick={() => router.push("/createpost/business/step2")}>
            Go Back
          </Button>
          <Button onClick={handleSubmit}>Submit Post</Button>
        </div>
      </div>
    </div>
  );
}
