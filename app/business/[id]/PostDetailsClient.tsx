"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";

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
    <section className="max-w-5xl mx-auto px-4 py-10 md:py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative rounded-3xl overflow-hidden shadow-2xl mb-12"
      >
        <img
          src={post.imageUrl}
          alt={post.name}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute top-5 left-5">
          <Badge className="bg-white/80 backdrop-blur-md text-black font-semibold shadow-lg px-4 py-1 text-sm">
            {post.businessType}
          </Badge>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="text-center font-extrabold text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent tracking-tight mb-4"
      >
        {post.name}
      </motion.h1>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        <Badge variant="secondary">Stage: {post.stage}</Badge>
        <Badge variant="outline">Launch: {post.launchTimeline}</Badge>
        {!post.fundingRequired && (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Self-funded
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
              className="px-4 py-1 font-bold animate-pulse shadow-lg"
            >
              Needs ₹{post.fundingAmount.toLocaleString()}
            </Badge>
          </motion.div>
        )}
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Card className="rounded-2xl border border-white/20 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6 md:p-10 space-y-8">
            <p className="text-lg leading-relaxed md:text-xl text-zinc-700 dark:text-zinc-300">
              {post.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <span className="block text-xs uppercase text-muted-foreground mb-1">
                  Est. Budget
                </span>
                <span className="text-xl font-bold text-pink-500">
                  ₹{post.estimatedBudget.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase text-muted-foreground mb-1">
                  Available Funds
                </span>
                <span className="text-xl font-bold text-purple-600">
                  ₹{post.availableMoney.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase text-muted-foreground mb-1">
                  Stage
                </span>
                <span className="text-base font-semibold">{post.stage}</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-muted-foreground mb-1">
                  Timeline
                </span>
                <span className="text-base font-semibold">
                  {post.launchTimeline}
                </span>
              </div>
            </div>

            {/* Funding banner */}
            {post.fundingRequired && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6 rounded-xl bg-gradient-to-r from-rose-100 via-pink-100 to-orange-50 dark:from-zinc-800/80 dark:via-pink-900/80 dark:to-orange-900/50 px-6 py-5 flex items-center gap-4"
              >
                <svg
                  width={32}
                  height={32}
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-rose-600 dark:text-pink-300"
                >
                  <path
                    d="M12 3v10M12 13c4.418 0 8 1.343 8 3v2H4v-2c0-1.657 3.582-3 8-3z"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                  <circle cx={12} cy={7} r={2} fill="currentColor" />
                </svg>
                <span className="text-base md:text-lg font-semibold text-rose-700 dark:text-pink-200">
                  Seeking funding of{" "}
                  <span className="font-bold">
                    ₹{post.fundingAmount.toLocaleString()}
                  </span>
                </span>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              {post.fundingRequired && (
                <button className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow hover:opacity-90 transition">
                  Offer Funding
                </button>
              )}
              <button className="px-6 py-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold shadow hover:opacity-90 transition">
                Contact
              </button>
            </div>

            {/* Posted date */}
            <div className="pt-4 text-right text-xs text-muted-foreground">
              Posted on {format(new Date(post.createdAt), "dd MMM yyyy")}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Related Posts */}
      {relatedPosts?.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {relatedPosts.map((related, i) => (
              <Link
                href={`/business/${related._id}`}
                key={i}
                className="block"
              >
                <Card className="hover:shadow-lg transition">
                  <img
                    src={related.imageUrl}
                    alt={related.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{related.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {related.businessType}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
