"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterStep1() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [location, setLocation] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
    if (session?.user?.registrationCompleted) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const updateSocialLink = (index: number, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = value;
    setSocialLinks(updatedLinks);
  };

  const handleContinue = () => {
    // Build query string to pass data to step2
    const params = new URLSearchParams({
      phone,
      bio,
      profilePic,
      location,
      socialLinks: JSON.stringify(socialLinks),
    });

    router.push(`/register/step2?${params.toString()}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">Complete Registration</h1>
      <p className="text-center text-muted-foreground mb-6">
        Signed in as <span className="font-medium">{session?.user?.email}</span>
      </p>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      {/* Profile Pic */}
      <div className="space-y-2">
        <Label htmlFor="profilePic">Profile Picture (optional)</Label>
        <Input
          id="profilePic"
          type="url"
          placeholder="Profile picture URL"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          type="text"
          placeholder="City, State, Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Social Media Links */}
      <div className="space-y-2">
        <Label>Social Media Links</Label>
        {socialLinks.map((link, index) => (
          <Input
            key={index}
            type="url"
            placeholder="https://..."
            value={link}
            onChange={(e) => updateSocialLink(index, e.target.value)}
            className="mb-2"
          />
        ))}
        <Button type="button" variant="secondary" onClick={addSocialLink}>
          + Add another
        </Button>
      </div>

      {/* Continue */}
      <Button className="w-full mt-4" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
}
