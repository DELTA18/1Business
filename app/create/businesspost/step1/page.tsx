"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
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
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic"; // ✅ Needed for client-only MD editor

// Dynamically import Markdown Editor (to avoid SSR issues)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function BusinessStep1Form() {
  const router = useRouter();
  const { setStep1Data } = useBusinessPostStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState<string>("");
  const [businessType, setBusinessType] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [stage, setStage] = useState("");
  const [timeline, setTimeline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStep1Data({
      name,
      description, // This now contains markdown content
      businessType,
      imageUrl: imageURL,
      stage,
      launchTimeline: timeline,
    });

    router.push("/create/businesspost/step2");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-28 px-4"
    >
      <div className="font-poppins relative max-w-4xl mx-auto rounded-[24px] bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80 p-[2px] shadow-xl shadow-blue-900/30">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-950/90 rounded-[22px] p-10 md:p-14 space-y-10 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
            >
              🚀 Start Your Business
            </motion.h2>
            <p className="text-gray-400 text-sm">Step 1 of 3</p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Business Name</Label>
            <Input
              placeholder="e.g. CloudEats, InstaFix"
              className="focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Detailed Description (Markdown Editor) */}
          <div className="space-y-2" data-color-mode="dark">
            <Label className="text-gray-300 text-sm">
              Detailed Description{" "}
              <span className="text-xs text-gray-400">(Markdown Supported)</span>
            </Label>
            <MDEditor
              value={description}
              onChange={(val) => setDescription(val || "")}
              height={220}
              preview="edit" // You can change to "live" for split preview
              textareaProps={{
                placeholder:
                  "Describe your business idea, vision, and details here. You can use headings, bold text, lists, and links with markdown.",
              }}
              className="rounded-lg border border-gray-700 bg-gray-900"
            />
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Business Type</Label>
            <ComboboxDemo value={businessType} onChange={setBusinessType} />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Image URL</Label>
            <Input
              type="url"
              placeholder="Paste an image link (https://...)"
              className="focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value.trim())}
              required
            />
          </div>

          {/* Image Preview */}
          <AnimatePresence>
            {imageURL && (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={imageURL}
                alt="Preview"
                className="w-full max-w-[500px] h-auto mt-4 rounded-xl border border-white/10 shadow-lg mx-auto"
              />
            )}
          </AnimatePresence>

          {/* Stage */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Stage of Business</Label>
            <Select onValueChange={(val) => setStage(val)}>
              <SelectTrigger className="focus:ring-2 focus:ring-blue-500/50">
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
            <Label className="text-gray-300 text-sm">Launch Timeline</Label>
            <Select onValueChange={(val) => setTimeline(val)}>
              <SelectTrigger className="focus:ring-2 focus:ring-blue-500/50">
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
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:brightness-110 hover:shadow-lg transition-all group"
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
