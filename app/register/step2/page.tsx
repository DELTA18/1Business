'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Briefcase, UserCog, Warehouse } from 'lucide-react';

export default function RegisterStep2() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const googleId = searchParams.get('googleId') || session?.user?.googleId;

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleAccountType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleContinue = async () => {
    if (!googleId) {
      console.error("No googleId found in URL params");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register/accountType", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleId,
          accountTypes: selectedTypes,
        }),
      });
      if (!res.ok) throw new Error("Failed to update account type");

      router.push(
        `/register/complete?googleId=${googleId}&accountTypes=${selectedTypes.join(",")}`
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const options = [
    {
      key: "start-business",
      label: "Start a Business",
      desc: "Kickstart your entrepreneurial journey with a new business idea.",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      key: "share-profession",
      label: "Share Profession",
      desc: "Offer your professional skills and collaborate with others.",
      icon: <UserCog className="w-6 h-6" />,
    },
    {
      key: "share-physical",
      label: "Share an Asset",
      desc: "List your space, equipment, or machine for others to use.",
      icon: <Warehouse className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Choose Your Role
      </motion.h1>

      <div className="grid gap-6 w-full max-w-3xl">
        {options.map((opt, i) => {
          const selected = selectedTypes.includes(opt.key);
          return (
            <motion.div
              key={opt.key}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              onClick={() => toggleAccountType(opt.key)}
              className={`cursor-pointer rounded-2xl p-6 border backdrop-blur-sm shadow-lg transition-all duration-300
                ${
                  selected
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400 shadow-blue-500/30 scale-105"
                    : "bg-white/5 border-gray-700 hover:border-blue-500 hover:shadow-blue-500/20"
                }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${
                    selected ? "bg-blue-500 text-black" : "bg-gray-800"
                  }`}
                >
                  {opt.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{opt.label}</h2>
                  <p className="text-gray-400 text-sm">{opt.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-3xl mt-10"
      >
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-lg py-6 rounded-xl"
          disabled={loading || selectedTypes.length === 0}
          onClick={handleContinue}
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      </motion.div>
    </div>
  );
}
