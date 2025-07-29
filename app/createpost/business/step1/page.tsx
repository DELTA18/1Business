"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ComboboxDemo } from "@/components/TypeComboBox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useBusinessPostStore } from "@/stores/userBusinessPostStore";
import { motion } from "framer-motion";

export default function BusinessStep1Form() {
  const router = useRouter();
  const { setStep1Data } = useBusinessPostStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [stage, setStage] = useState("");
  const [timeline, setTimeline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStep1Data({
      name,
      description,
      businessType,
      imageUrl: imageURL,
      stage,
      launchTimeline: timeline,
    });

    router.push("/createpost/business/step2");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-28 px-4"
    >
      <div className="font-poppins relative max-w-4xl mx-auto p-[2px] rounded-[24px] bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 shadow-lg shadow-indigo-300/30">
        <form
          onSubmit={handleSubmit}
          className="bg-black/80 rounded-[22px] p-10 md:p-14 space-y-10 backdrop-blur-md"
        >
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 text-transparent bg-clip-text"
            >
              🚀 Start Your Business
            </motion.h2>
            <p className="text-gray-500 mt-2 text-sm">Step 1 of 3</p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label>Business Name</Label>
            <Input
              placeholder="e.g. CloudEats, InstaFix"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Quick overview of what your business does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <Label>Business Type</Label>
            <ComboboxDemo value={businessType} onChange={setBusinessType} />
          </div>

          {/* Image URL Only */}
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              type="url"
              placeholder="Paste an image link (https://...)"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value.trim())}
              required
            />
          </div>

          {/* Preview */}
          {imageURL && (
            <img
              src={imageURL}
              alt="Preview"
              className="w-full max-w-[500px] h-auto mt-4 rounded-xl border shadow-md"
            />
          )}

          {/* Stage */}
          <div className="space-y-2">
            <Label>Stage of Business</Label>
            <Select onValueChange={(val) => setStage(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">Just an idea</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="building">Building</SelectItem>
                <SelectItem value="launched">Already Launched</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <Label>Launch Timeline</Label>
            <Select onValueChange={(val) => setTimeline(val)}>
              <SelectTrigger>
                <SelectValue placeholder="When will you launch?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Within 1 month</SelectItem>
                <SelectItem value="3months">1–3 months</SelectItem>
                <SelectItem value="6months">3–6 months</SelectItem>
                <SelectItem value="never">Not sure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:brightness-110 hover:shadow-2xl transition-all group"
            >
              Continue{" "}
              <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
