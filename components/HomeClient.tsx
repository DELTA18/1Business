'use client';

import CreatePost from "@/components/CreatePost";
import BusinessPostDisplay from "@/components/BusinessPostDisplay";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HomeClient({ session, posts }: any) {
  return (
    <main className="relative mt-12 min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-6 py-16">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3">
          <Sparkles className="text-cyan-400 animate-pulse" size={28} />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Get your Business Ideas <span className="text-cyan-400">Sparkling</span>
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl text-lg">
          Discover and share innovative startup & business ideas. Create your post, explore others, and get inspired!
        </p>
      </div>

      {/* Main Content */}
      {session ? (
        <div className="w-full max-w-6xl mx-auto mt-12 space-y-12">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow p-6">
            <CreatePost />
          </div>

          {/* Posts */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-8">
              Latest Business Ideas
            </h2>
            {posts.length === 0 ? (
              <p className="text-gray-400 text-center mt-6">
                No posts yet. Be the first to create one!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post: any, index: number) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BusinessPostDisplay post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : (
        <p className="text-lg text-red-400 font-medium text-center mt-12">
          Please sign in to view and create business ideas.
        </p>
      )}

      {/* Floating Button */}
      {session && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6"
        >
          
        </motion.div>
      )}
    </main>
  );
}
