"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Image as ImageIcon, Link as LinkIcon, Briefcase, UserCog, Warehouse } from "lucide-react";

export default function RegisterOnboarding() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const googleIdFromUrl = params.get("googleId");

  // multi-step
  const [step, setStep] = useState(1);

  // Step 1 state
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [location, setLocation] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);

  // Step 2 state
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleId = useMemo(() => googleIdFromUrl || session?.user?.googleId || "", [googleIdFromUrl, session]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/");
    // don't auto-redirect if registrationCompleted — allow re-run of onboarding if needed
  }, [session, status, router]);

  // helpers for social links
  const addSocialLink = () => setSocialLinks((s) => [...s, ""]);
  const removeSocialLink = (i: number) => setSocialLinks((s) => s.filter((_, idx) => idx !== i));
  const updateSocialLink = (i: number, v: string) => setSocialLinks((s) => s.map((x, idx) => (idx === i ? v : x)));

  // image preview helper
  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePic(String(reader.result));
    reader.readAsDataURL(file);
  };

  // Step 1: save profile
  const saveStep1 = async () => {
    setError(null);
    if (!session?.user?.email) return setError("Please sign in again.");

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          phone,
          bio,
          profilePic,
          location,
          socialLinks: socialLinks.filter(Boolean),
          // include googleId if available so backend can link
          googleId,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to save profile");

      // proceed to next step
      setStep(2);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: save account types
  const saveStep2 = async () => {
    if (!googleId) return setError("Missing googleId — please sign in again.");
    if (!selectedTypes.length) return setError("Select at least one role.");

    setLoading(true);
    try {
      const res = await fetch("/api/register/accountType", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleId, accountTypes: selectedTypes }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to save roles");

      setStep(3);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: finish
  const handleFinish = () => {
    router.push("/");
  };

  // role prompt mapping
  const rolePrompts: Record<
    string,
    { title: string; desc: string; action: string; link: string; icon: JSX.Element }
  > = {
    "start-business": {
      title: "Create your first Business Post",
      desc: "Share your idea, request help, or pitch your startup to the community.",
      action: "Create Post",
      link: "/createpost/business/step1",
      icon: <Briefcase className="w-6 h-6 text-purple-300" />,
    },
    "share-profession": {
      title: "Add your first Service",
      desc: "List your skills and start getting bookings from businesses.",
      action: "Add Service",
      link: "/createpost/professional/step1",
      icon: <UserCog className="w-6 h-6 text-green-300" />,
    },
    "share-physical": {
      title: "List your first Asset",
      desc: "Share your space or equipment with entrepreneurs in need.",
      action: "List Asset",
      link: "/createpost/asset/step1",
      icon: <Warehouse className="w-6 h-6 text-blue-300" />,
    },
  };

  // UI helpers
  const Stepper = ({ step }: { step: number }) => (
    <div className="flex items-center gap-4 justify-center mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all 
              ${s === step ? "bg-gradient-to-r from-purple-400 to-blue-400 text-black shadow-lg" : "bg-gray-800 text-gray-300 border border-gray-700"}`}
          >
            {s}
          </div>
          {s < 3 && <div className="w-8 h-0.5 bg-gray-700" />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020214] via-[#070816] to-[#0c1020] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left panel: progress & preview */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="md:col-span-4 rounded-3xl p-6 bg-gradient-to-br from-white/3 to-white/6 backdrop-blur-sm border border-white/6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-400 flex items-center justify-center text-black font-bold">1B</div>
            <div>
              <div className="text-lg font-semibold">Welcome to 1Business</div>
              <div className="text-sm text-gray-300">Finish these quick steps to get discovered.</div>
            </div>
          </div>

          <Stepper step={step} />

          <div className="mt-6 text-sm text-gray-300">
            <div className="font-medium text-white mb-2">Preview</div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                {profilePic ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profilePic} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">👤</div>
                )}
              </div>
              <div>
                <div className="text-sm font-medium">{session?.user?.name || session?.user?.email}</div>
                <div className="text-xs text-gray-400">{bio || "Tell people what you do..."}</div>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-400">
              Tip: Add a short bio and a profile picture — it increases trust and replies.
            </div>
          </div>
        </motion.div>

        {/* Right panel: step content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="md:col-span-8 rounded-3xl p-6 bg-gradient-to-br from-white/3 to-white/6 backdrop-blur-sm border border-white/6 shadow-2xl"
        >
          <div className="w-full">
            {/* Step header */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold">{step === 1 ? "Complete Your Profile" : step === 2 ? "Choose Your Role(s)" : "You're Ready"}</h1>
              <p className="text-sm text-gray-300 mt-2">
                {step === 1
                  ? "Provide a few details so others can find and trust you."
                  : step === 2
                  ? "Select one or more roles — you can always add more later."
                  : "Finish setup or jump into creating posts, services, or assets."}
              </p>
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); saveStep1(); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-300 flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> Phone</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="bg-transparent border-gray-700 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-gray-300 flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> Location</Label>
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" className="bg-transparent border-gray-700 text-white" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-gray-300 flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /> Bio</Label>
                  <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short, punchy description about you" className="bg-transparent border-gray-700 text-white" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div>
                    <Label className="text-gray-300 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-gray-400" /> Profile Picture</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <label className="relative flex items-center gap-3 cursor-pointer">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center border border-white/6">
                          {profilePic ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={profilePic} alt="profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-gray-500">No photo</div>
                          )}
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} className="hidden" />
                        <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-black font-medium">Upload</div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 flex items-center gap-2"><LinkIcon className="w-4 h-4 text-gray-400" /> Social Links</Label>
                    <div className="mt-2 space-y-2">
                      {socialLinks.map((link, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input value={link} onChange={(e) => updateSocialLink(idx, e.target.value)} placeholder="https://" className="bg-transparent border-gray-700 text-white" />
                          {socialLinks.length > 1 && (
                            <button type="button" onClick={() => removeSocialLink(idx)} className="text-sm text-red-400 px-2">Remove</button>
                          )}
                        </div>
                      ))}
                      <div>
                        <Button type="button" onClick={addSocialLink} variant={"outline"} className="w-full">+ Add another</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {error && <div className="text-sm text-red-400">{error}</div>}

                <div className="flex items-center gap-3 mt-4">
                  <Button type="button" onClick={saveStep1} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600">{loading ? "Saving..." : "Save & Continue"}</Button>
                </div>
              </form>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {[
                    { id: "start-business", label: "Start a Business", desc: "Share your idea or request help.", icon: <Briefcase className="w-6 h-6" /> },
                    { id: "share-profession", label: "Share Profession", desc: "Offer your skills and services.", icon: <UserCog className="w-6 h-6" /> },
                    { id: "share-physical", label: "Share Asset", desc: "List your space or equipment.", icon: <Warehouse className="w-6 h-6" /> },
                  ].map((opt) => {
                    const selected = selectedTypes.includes(opt.id);
                    return (
                      <motion.div key={opt.id} whileHover={{ scale: 1.02 }} className={`p-4 rounded-2xl cursor-pointer border ${selected ? "bg-gradient-to-r from-purple-800/30 to-blue-800/30 border-purple-500" : "bg-transparent border-gray-700"}`} onClick={() => setSelectedTypes((s) => s.includes(opt.id) ? s.filter(x => x !== opt.id) : [...s, opt.id])}>
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${selected ? "bg-purple-600 text-black" : "bg-gray-800"}`}>{opt.icon}</div>
                          <div>
                            <div className="font-semibold">{opt.label}</div>
                            <div className="text-sm text-gray-400">{opt.desc}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant={"outline"} onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button onClick={saveStep2} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500">{loading ? "Saving..." : "Save Roles & Continue"}</Button>
                </div>

                {error && <div className="text-sm text-red-400">{error}</div>}
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  {selectedTypes.map((t) => {
                    const prompt = rolePrompts[t];
                    if (!prompt) return null;
                    return (
                      <motion.div key={t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="p-3 rounded-lg bg-gray-800">{prompt.icon}</div>
                            <div>
                              <div className="font-semibold">{prompt.title}</div>
                              <div className="text-sm text-gray-400">{prompt.desc}</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button onClick={() => router.push(prompt.link + `?googleId=${googleId}`)} className="bg-gradient-to-r from-purple-600 to-blue-500">{prompt.action}</Button>
                            <Button variant={"outline"} onClick={() => {/* skip for later — no-op */}} >Skip</Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant={"outline"} onClick={() => setStep(2)} className="flex-1">Back</Button>
                  <Button onClick={handleFinish} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">Finish & Go to Home</Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
