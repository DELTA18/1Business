"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Mail,
  Phone,
  Link as LinkIcon,
  Copy,
  Check,
  Loader2,
  Pencil,
} from "lucide-react";

type User = {
  googleId: string;
  name: string;
  email: string;
  image?: string;
  profilePic?: string;
  bio?: string;
  phone?: string;
  location?: string;
  socialLinks?: string[];
};

type Post = {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  businessType?: string;
  createdAt: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [activeTab, setActiveTab] = useState("about");
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  const { id } = useParams();
  console.log(id, "profile id");

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (status !== "authenticated") return;

        const res = await fetch(`/api/users?googleId=${encodeURIComponent(id)}`);
        const data = await res.json();

        if (!data.success || !data.user) {
          setError(data.error || "User not found");
        } else {
          setUser(data.user as User);
        }
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [status, session?.user]);

  // Fetch posts only when user clicks "Posts" tab
  useEffect(() => {
    if (activeTab !== "posts" || !user) return;

    const fetchPosts = async () => {
      try {
        setPostsLoading(true);
        setPostsError(null);

        const res = await fetch(`/api/posts?googleId=${encodeURIComponent(id)}`);
        const data = await res.json();

        if (!data.success) {
          setPostsError(data.error || "Failed to load posts");
          return;
        }

        setPosts(data.posts || []);
      } catch {
        setPostsError("Failed to load posts");
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab, user]);

  const handleCopyEmail = async () => {
    if (!user?.email) return;
    await navigator.clipboard.writeText(user.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1200);
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <p className="text-red-400 mb-4">{error || "User not found"}</p>
        <Button onClick={() => location.reload()} className="bg-blue-600 hover:bg-blue-700">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Retry
        </Button>
      </div>
    );
  }

  const avatarSrc = user.profilePic || user.image || "/default-avatar.png";
  const socialLinks = user.socialLinks || [];

  return (
    <div className="min-h-screen mt-10
     bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      {/* Header Section */}
      <section className="p-6 sm:p-10 flex flex-col sm:flex-row gap-6 items-center sm:items-start border-b border-zinc-800 bg-zinc-900/40">
        <div className="relative">
          <Avatar className="h-28 w-28 ring-2 ring-zinc-800">
            <AvatarImage src={avatarSrc} alt={user.name} />
            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            title="Edit avatar"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <div className="mt-2 flex flex-wrap gap-3 justify-center sm:justify-start text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {user.email}
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-zinc-300 hover:text-white"
                onClick={handleCopyEmail}
                title="Copy email"
              >
                {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </span>
            {user.phone && (
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {user.phone}
              </span>
            )}
            {user.location && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {user.location}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-200">
              Posts: {posts.length}
            </Badge>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-200">
              Followers: 0
            </Badge>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-200">
              Views: 0
            </Badge>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="p-6 sm:p-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-zinc-800/60">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* About */}
          <TabsContent value="about" className="mt-6 text-zinc-300">
            {user.bio || "No bio yet."}
          </TabsContent>

          {/* Posts */}
          <TabsContent value="posts" className="mt-6">
            {postsLoading && <div className="text-zinc-400">Loading posts...</div>}
            {postsError && <div className="text-red-400">{postsError}</div>}
            {!postsLoading && posts.length === 0 && !postsError && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-zinc-400 mb-3">You haven’t created any posts yet.</p>
                <Button className="bg-blue-600 hover:bg-blue-700">Create your first post</Button>
              </div>
            )}

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 transition p-4 flex flex-col"
                >
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="rounded-lg object-cover h-40 w-full mt-2"
                    />
                  )}
                  <p className="text-sm text-zinc-400 mt-2 line-clamp-2">{post.content}</p>
                  <div className="mt-2 flex gap-2">
                    <Badge className="bg-zinc-800 text-zinc-300">
                      {post.businessType || "Business"}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>

                  <div className="mt-auto flex justify-between items-center pt-3">
                    <Button variant="outline" size="sm" className="text-xs">
                      View
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-xs text-green-400">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-red-400">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
