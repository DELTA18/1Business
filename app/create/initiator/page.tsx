'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, Rocket, Lightbulb } from "lucide-react";

export default function CreatePostInitiator() {
  const router = useRouter();
  const posttypes = [
    { 
      id: 1, 
      type: "Start your Business", 
      icon: <Rocket size={36} />, 
      desc: "Turn your idea into reality and get feedback from others.",
      next: "/create/businesspost/step1" 
    },
    { 
      id: 2, 
      type: "Share your Profession", 
      icon: <Briefcase size={36} />, 
      desc: "Show your skills and let people know what you do best.",
      next: "/create/service/step1" 
    },
    { 
      id: 3, 
      type: "Share your Thing", 
      icon: <Lightbulb size={36} />, 
      desc: "Showcase your products, side hustles or unique creations.",
      next: "/create/thing/step1" 
    },
  ];

  const handlePostTypeClick = (next: string) => {
    router.push(next);
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-6 py-24 bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
          Choose your creation type:
        </h1>
        {/* <p className="text-gray-400 text-lg">
          Select which type of post you want to create
        </p> */}
      </div>

      {/* Post Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-10">
        {posttypes.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handlePostTypeClick(post.next)}
            className="cursor-pointer group bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg transition-all"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="bg-gradient-to-tr from-blue-500 to-cyan-400 p-4 rounded-full text-white group-hover:scale-110 transition-transform">
                {post.icon}
              </div>
              <h2 className="text-xl font-semibold text-white">{post.type}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{post.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
