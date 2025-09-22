"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Create from "@/components/Create";
import BusinessPostDisplay from "@/components/BusinessPostDisplay";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  description: string;
  [key: string]: unknown; // allow extra fields without using `any`
}

interface Session {
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
}

export default function HomeClient({ session }: { session: Session | null }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const LIMIT = 6;

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/posts?limit=${LIMIT}&skip=${skip}`);
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => [...prev, ...data.posts]);
        setSkip((prev) => prev + data.posts.length);
        if (skip + data.posts.length >= data.totalCount) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [skip, hasMore, loading]);

  // initial load
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // intersection observer for infinite scroll
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPosts();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [fetchPosts]);

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
            <Create />
          </div>

          {/* Posts */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-8">Latest Business Ideas</h2>

            {posts.length === 0 && !hasMore && !loading && !error ? (
              <p className="text-gray-400 text-center mt-6">No posts yet. Be the first to create one!</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post, index) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <BusinessPostDisplay post={post} />
                    </motion.div>
                  ))}

                  {/* Skeletons while loading */}
                  {loading &&
                    Array.from({ length: 2 }).map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse border border-gray-700 rounded-xl p-6 bg-gray-800"
                      >
                        <div className="h-6 bg-gray-600 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                      </div>
                    ))}
                </div>

                {/* Infinite Scroll Loader / Sentinel */}
                {hasMore && !error && (
                  <div ref={loaderRef} className="h-12 flex items-center justify-center text-gray-400">
                    {loading ? "Loading..." : "Scroll for more"}
                  </div>
                )}

                {/* Error handling with retry */}
                {error && (
                  <div className="text-center mt-6">
                    <p className="text-red-500 mb-2">Failed to load posts.</p>
                    <button
                      onClick={fetchPosts}
                      className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* End of list message */}
                {!hasMore && posts.length > 0 && !loading && !error && (
                  <p className="text-center text-gray-500 py-6">
                    🎉 You’ve reached the end!
                  </p>
                )}
              </>
            )}
          </section>
        </div>
      ) : (
        <p className="text-lg text-red-400 font-medium text-center mt-12">
          Please sign in to view and create business ideas.
        </p>
      )}
    </main>
  );
}
