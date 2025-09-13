"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProfessionPostStore } from "@/stores/userProfessionPostStore";

export default function ProfessionStep1Form() {
  const router = useRouter();
  const { setStep1Data } = useProfessionPostStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStep1Data({
      name,
      description,
      experience,
      type,
      askingPrice: price,
    });

    router.push("/createpost/profession/step2");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-28 px-4"
    >
      <div className="font-poppins relative max-w-4xl mx-auto rounded-[24px] bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 p-[2px] shadow-xl shadow-teal-900/30">
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
              className="text-4xl font-extrabold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 text-transparent bg-clip-text"
            >
              💼 Share Your Profession
            </motion.h2>
            <p className="text-gray-400 text-sm">Step 1 of 2</p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Service Title</Label>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Description</Label>
            <Textarea
              placeholder="Describe your profession, skills, and background..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Experience</Label>
            <Input
              placeholder="e.g. 5 years as a software engineer"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Type of Profession</Label>
            <Input
              placeholder="e.g. Web Developer, Designer, Lawyer"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>

          {/* Asking Price */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Asking Price (₹)</Label>
            <Input
              type="number"
              placeholder="e.g. 50000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white hover:brightness-110 hover:shadow-2xl transition-all group"
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
