"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PostType = {
  _id?: string;
  name: string;
  description: string;
  businessType: string;
  stage: string;
  launchTimeline: string;
  estimatedBudget: number;
  availableMoney: number;
  fundingRequired: boolean;
  fundingAmount: number;
  imageUrl: string;
  createdAt: string;
};

type Props = {
  post: PostType;
  relatedPosts: PostType[];
};

export default function PostDetailsClient({ post, relatedPosts }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl shadow-2xl mb-14 group"
      >
        <img
          src={post.imageUrl}
          alt={post.name}
          className="w-full h-[420px] object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute top-6 left-6 flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
          <span className="text-sm font-medium">{post.businessType}</span>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            {post.name}
          </h1>
        </div>
      </motion.div>

      {/* Meta */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        <Badge className="flex items-center gap-2 px-4 py-1 shadow">
          🎯 Stage: {post.stage}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-4 py-1 shadow">
          🚀 Launch: {post.launchTimeline}
        </Badge>
        {!post.fundingRequired && (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300 flex items-center gap-2 px-4 py-1 shadow"
          >
            ✅ Self-funded
          </Badge>
        )}
        {post.fundingRequired && (
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 180 }}
          >
            <Badge
              variant="destructive"
              className="px-4 py-1 font-bold animate-pulse shadow-lg flex items-center gap-2"
            >
              💰 Needs ₹{post.fundingAmount.toLocaleString()}
            </Badge>
          </motion.div>
        )}
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Card className="rounded-2xl border border-white/20 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-lg shadow-2xl">
          <CardContent className="p-8 md:p-12 space-y-10">
            {/* Description */}
            <div className="prose dark:prose-invert max-w-none prose-headings:mb-4 prose-p:mb-4 prose-ul:mb-4 prose-li:my-0 prose-strong:text-pink-500">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.description}
              </ReactMarkdown>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { label: "Est. Budget", value: `₹${post.estimatedBudget.toLocaleString()}`, color: "text-pink-500" },
                { label: "Available Funds", value: `₹${post.availableMoney.toLocaleString()}`, color: "text-purple-600" },
                { label: "Stage", value: post.stage, color: "text-zinc-900 dark:text-zinc-100" },
                { label: "Timeline", value: post.launchTimeline, color: "text-zinc-900 dark:text-zinc-100" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm shadow-md"
                >
                  <span className="block text-xs uppercase text-muted-foreground mb-1">
                    {stat.label}
                  </span>
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Funding Banner */}
            {post.fundingRequired && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 rounded-xl bg-gradient-to-r from-rose-100 via-pink-100 to-orange-50 dark:from-zinc-800/80 dark:via-pink-900/80 dark:to-orange-900/50 px-6 py-5 flex items-center gap-4 shadow-inner"
              >
                <span className="text-2xl">📢</span>
                <span className="text-base md:text-lg font-semibold text-rose-700 dark:text-pink-200">
                  Seeking funding of{" "}
                  <span className="font-bold">
                    ₹{post.fundingAmount.toLocaleString()}
                  </span>
                </span>
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              {post.fundingRequired && (
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                  💸 Offer Funding
                </button>
              )}
              <button className="px-6 py-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                ✉️ Contact
              </button>
            </div>

            {/* Date */}
            <div className="pt-4 text-right text-xs text-muted-foreground">
              Posted on {format(new Date(post.createdAt), "dd MMM yyyy")}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Related Posts - Carousel on Mobile */}
      {relatedPosts?.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Related Posts</h2>
            <Link
              href="/business"
              className="text-sm text-pink-500 hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-visible">
            {relatedPosts.map((related, i) => (
              <Link
                href={`/business/${related._id}`}
                key={i}
                className="group relative min-w-[250px] snap-start sm:min-w-0 sm:w-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={related.imageUrl}
                    alt={related.name}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="absolute bottom-0 w-full p-5 z-10">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:text-pink-400 transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-sm text-white/80 truncate">
                    {related.businessType}
                  </p>
                </CardContent>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
