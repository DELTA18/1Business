"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

type PostType = {
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

export default function PostDetailsClient({ post }: { post: PostType }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center text-4xl md:text-6xl font-extrabold leading-tight mb-8 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-md"
      >
        {post.name}
      </motion.h1>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="rounded-3xl overflow-hidden shadow-xl mb-10"
      >
        <img
          src={post.imageUrl}
          alt={post.name}
          className="w-full h-[240px] sm:h-[320px] md:h-[420px] object-cover"
        />
      </motion.div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
      >
        <Card className="rounded-2xl border border-border bg-muted/30 backdrop-blur-lg shadow-lg dark:bg-zinc-900/30">
          <CardContent className="p-6 md:p-8 space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              <Badge variant="outline">{post.businessType}</Badge>
              <Badge variant="secondary">Stage: {post.stage}</Badge>
              <Badge variant="secondary">Launch: {post.launchTimeline}</Badge>
              <Badge variant="secondary">
                Budget: ₹{post.estimatedBudget.toLocaleString()}
              </Badge>
              <Badge variant="secondary">
                Money: ₹{post.availableMoney.toLocaleString()}
              </Badge>
              {post.fundingRequired && (
                <Badge variant="destructive">
                  Needs ₹{post.fundingAmount.toLocaleString()}
                </Badge>
              )}
            </div>

            <div className="pt-4 text-right text-xs text-muted-foreground">
              Posted on {format(new Date(post.createdAt), "dd MMM yyyy")}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
