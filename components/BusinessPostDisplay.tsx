'use client';

import React, { useEffect, useState } from 'react';
import {
  BadgeDollarSign,
  Factory,
  Rocket,
  CalendarClock,
  Heart,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';

function getRelativeTime(updatedAt: string) {
  const updatedDate = new Date(updatedAt);
  const now = new Date();

  const isToday = updatedDate.toDateString() === now.toDateString();

  if (isToday) {
    const diffMs = now.getTime() - updatedDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours >= 1) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes >= 1) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
      return `Just now`;
    }
  }

  return updatedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
}

const BusinessPostDisplay = ({ post }: any) => {
  const [userData, setUserData] = useState<{ name: string; image: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!post.userId) return; // No user id
      try {
        const res = await fetch(`/api/users/${post.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUserData({ name: data.name, image: data.image });
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUser();
  }, [post.userId]);

  if (!post || !post._id) {
    return <div className="text-red-500">Post not found</div>;
  }

  return (
    <div
      key={post._id}
      className="relative group md:max-w-[500px] rounded-3xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-xl p-6 shadow-xl hover:shadow-2xl transition duration-300"
    >
      {/* Timestamp */}
      <div className="absolute top-3 right-4 z-10 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-lg shadow-sm">
        {getRelativeTime(post.updatedAt)}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        {post.userId && userData ? (
          <>
            <img
              src={userData.image}
              alt={userData.name}
              className="w-10 h-10 rounded-full border border-white/30 object-cover"
            />
            <span className="text-white font-medium text-sm">{userData.name}</span>
          </>
        ) : (
          <span className="text-gray-400 text-sm">Anonymous User</span>
        )}
      </div>

      {/* Image */}
      <div className="rounded-2xl overflow-hidden mb-5 shadow-md">
        <img
          src={post.imageUrl}
          alt={post.name}
          className="w-full h-70 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title */}
      <h3 className="text-white text-2xl font-bold mb-2 leading-tight">{post.name}</h3>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-4">
        {post.description.length > 160
          ? post.description.slice(0, 160) + '...'
          : post.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-xs font-medium mb-4">
        <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full shadow-inner">
          <Factory size={14} /> {post.businessType}
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-300 rounded-full shadow-inner">
          <Rocket size={14} /> {post.stage}
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full shadow-inner">
          <CalendarClock size={14} /> {post.launchTimeline}
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-300 rounded-full shadow-inner">
          <BadgeDollarSign size={14} /> ₹{post.estimatedBudget}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <Link
          href={`/post/${post._id}`}
          className="text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 transition px-4 py-2 rounded-full shadow-md hover:shadow-lg"
        >
          View Details
        </Link>

        <div className="flex items-center gap-4">
          <button className="group relative flex items-center gap-1 text-gray-300 hover:text-rose-400 transition">
            <Heart size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs">24</span>
          </button>
          <button className="group relative flex items-center gap-1 text-gray-300 hover:text-blue-400 transition">
            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs">7</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessPostDisplay;
