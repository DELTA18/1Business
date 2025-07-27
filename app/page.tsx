import { auth } from "./api/auth/[...nextauth]/route";
import { BadgeDollarSign, Factory, Rocket, CalendarClock } from "lucide-react";
import CreatePost from "@/components/CreatePost";

export default async function Home() {
  const session = await auth();

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    cache: "no-store",
  });

  const data = await res.json();
  const posts = data.posts || [];

  return (
    <main className="flex flex-col items-center justify-center gap-10 p-24 bg-gray-950 min-h-screen">
      <h1 className="text-6xl font-bold text-white mb-6">Home</h1>

      {session ? (
        <>
          <p className="text-xl text-green-500">Signed in as {session.user?.email}</p>
          <p className="text-xl font-semibold text-green-400 mb-4">Welcome, {session.user?.name}</p>

          <CreatePost />

          <section className="mt-12 w-full max-w-5xl">
            <h2 className="text-3xl font-bold text-white mb-6">Latest Business Ideas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post: any) => (
                <div key={post._id} className="bg-white/10 border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all p-6 backdrop-blur-md">
                  <img
                    src={post.imageUrl}
                    alt={post.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold text-white mb-2">{post.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{post.description.length > 150 ? post.description.slice(0, 150) + "..." : post.description}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">
                      <Factory size={16} /> {post.businessType}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      <Rocket size={16} /> {post.stage}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                      <CalendarClock size={16} /> {post.launchTimeline}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                      <BadgeDollarSign size={16} /> ₹{post.estimatedBudget}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <p className="text-lg text-red-500">Not signed in</p>
      )}
    </main>
  );
}
