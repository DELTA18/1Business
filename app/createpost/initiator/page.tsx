
'use client';

import next from "next";
import { useRouter } from "next/navigation";
export default function CreatePostInitiator() {

  const router = useRouter();
  const posttypes = [
    { id: 1, type: "Start your business", next: "/createpost/business/step1" },
    { id: 2, type: "Share your Profession", next: "/createpost/profession/step1" },
    { id: 3, type: "Share your Thing", next: "/createpost/thing/step1" },
  ];

  const handlePostTypeClick = (next: string) => {
    // Logic to handle post type selection
    console.log(`Selected post type: ${next}`);
    router.push(next);
  };
  return (
    <main className="flex flex-col items-center justify-center gap-10 p-24">
      <h1 className="text-7xl font-bold text-amber-200">Create Post</h1>
      <p className="text-lg text-gray-600">Select Which Type of Post You Want</p>

      <div>
        {posttypes.map((post) => (
          <div
            key={post.id}
            className="px-20 py-10 m-2 bg-blue-200 text-center rounded-lg cursor-pointer border-blue-600 border-2 hover:bg-blue-300"
            onClick={() => handlePostTypeClick(post.next)}
          >
            <label className="text-2xl text-gray-900">{post.type}</label>
          </div>
        ))}
      </div>
      {/* Add your post creation form or component here */}
    </main>
  );
}