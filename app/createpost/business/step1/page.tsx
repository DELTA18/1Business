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
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { useBusinessPostStore } from "@/stores/userBusinessPostStore";

export default function BusinessStep1Form() {
  const router = useRouter();
  const { setStep1Data } = useBusinessPostStore();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [businessType, setBusinessType] = useState(""); // Ideally passed from ComboboxDemo
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [stage, setStage] = useState("");
  const [timeline, setTimeline] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 💾 Save to Zustand
    setStep1Data({
      name,
      description,
      businessType,
      image,
      stage,
      launchTimeline: timeline,
    });

    // 🚀 Go to Step 2
    router.push("/createpost/business/step2");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-28 px-4"
    >
      <div className="relative max-w-4xl mx-auto p-[2px] rounded-[24px] bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 shadow-lg shadow-indigo-300/30 animate-pulse-slow">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[22px] p-10 md:p-14 space-y-10 backdrop-blur-md"
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

          {/* Field: Business Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Business Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. CloudEats, InstaFix"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus-visible:ring-2 focus-visible:ring-pink-400 shadow-md"
            />
          </div>

          {/* Field: Description */}
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              name="description"
              placeholder="Give a quick overview of what your business does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="focus-visible:ring-2 focus-visible:ring-blue-400 shadow-md"
            />
          </div>

          {/* Field: Type (To do: hook up state with Combobox) */}
          <div className="space-y-2">
            <Label>Business Type</Label>
            <ComboboxDemo value={businessType} onChange={setBusinessType} /> {/* <-- Modify your Combobox to accept onChange */}
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <Label>Business Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={500}
                height={280}
                className="rounded-2xl shadow-md mt-2 border border-gray-200"
              />
            )}
          </div>

          {/* Stage Select */}
          <div className="space-y-2">
            <Label>Stage of Business</Label>
            <Select onValueChange={(val) => setStage(val)}>
              <SelectTrigger className="focus:ring-2 focus:ring-indigo-400 shadow-md">
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

          {/* Timeline Select */}
          <div className="space-y-2">
            <Label>Launch Timeline</Label>
            <Select onValueChange={(val) => setTimeline(val)}>
              <SelectTrigger className="focus:ring-2 focus:ring-pink-400 shadow-md">
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

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:brightness-110 hover:shadow-2xl transition-all group"
            >
              Continue
              <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
