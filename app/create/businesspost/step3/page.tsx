"use client";

import { useRouter } from "next/navigation";
import { useBusinessPostStore } from "@/stores/userBusinessPostStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useSession } from "next-auth/react";

export default function ReviewPostPage() {
  const router = useRouter();
  const { step1Data, step2Data } = useBusinessPostStore();
  const { data: session } = useSession();
  const userId = session?.user?.googleId || session?.user?.id;

  if (!step1Data || !step2Data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg font-semibold">
        Missing post data. Please complete previous steps.
      </div>
    );
  }

  const handleSubmit = async () => {
    const postData = {
      userId,
      ...step1Data,
      ...step2Data,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        toast.error("Failed to submit post. Please try again.");
        return;
      }
      const result = await res.json();

      if (result.success) {
        toast.success("Post submitted successfully!");
        router.push("/");
      } else {
        toast.error("Failed to submit post. Please try again.");
        router.push("/createpost/failure");
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
      console.log(e);
    }
  };

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
          Review Your Business Post
        </motion.h1>

        {/* Review Card */}
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8 md:p-10 space-y-8">
              {/* Step 1 Info */}
              <div className="space-y-6">
                <Detail title="Business Name" value={step1Data.name} />

                {/* Render Markdown Description */}
                <div>
                  <h2 className="text-lg font-semibold text-white/90 mb-2">
                    Description
                  </h2>
                  <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:mb-0">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {step1Data.description}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* Step 1 + Step 2 Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Detail title="Business Type" value={step1Data.businessType} />
                <Detail title="Stage" value={capitalize(step1Data.stage)} />
                <Detail title="Launch Timeline" value={formatTimeline(step1Data.launchTimeline)} />
                <Detail title="Estimated Budget" value={`₹ ${formatNumber(step2Data.estimatedBudget)}`} />
                <Detail title="Available Money" value={`₹ ${formatNumber(step2Data.availableMoney)}`} />
                <Detail
                  title="Funding Required"
                  value={step2Data.fundingRequired ? "Yes" : "No"}
                />
                {step2Data.fundingRequired && (
                  <Detail title="Funding Amount" value={`₹ ${formatNumber(step2Data.fundingAmount)}`} />
                )}
              </div>

              {/* Image Preview */}
              {step1Data.imageUrl && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={step1Data.imageUrl}
                  alt="Uploaded business image preview"
                  width={800}
                  height={500}
                  className="w-full rounded-xl border border-white/20 shadow-lg mt-4 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <Button
            variant="outline"
            className="bg-white text-black hover:bg-gray-100 transition-all px-6 py-2 rounded-xl"
            onClick={() => router.push("/create/businesspost/step2")}
          >
            ← Go Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all text-white px-6 py-2 rounded-xl"
          >
            🚀 Submit Post
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

// Utility functions
function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatTimeline(t: string) {
  switch (t) {
    case "1month":
      return "Within 1 month";
    case "3months":
      return "1–3 months";
    case "6months":
      return "3–6 months";
    case "never":
      return "Not sure";
    default:
      return t;
  }
}

function formatNumber(n: number | string) {
  if (!n) return "0";
  const num = typeof n === "string" ? Number(n) : n;
  return num.toLocaleString("en-IN");
}
