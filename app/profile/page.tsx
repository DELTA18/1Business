"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (status !== "authenticated") return;

        const googleId = (session?.user as any)?.googleId as string | undefined;
        if (!googleId) {
          setError("Missing googleId in session.");
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/users?googleId=${encodeURIComponent(googleId)}`);
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

        const res = await fetch(`/api/posts?googleId=${encodeURIComponent(user.googleId)}`);
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
        <div className="w-full max-w-3xl">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex gap-6 items-center">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="w-full space-y-3">
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-4 w-40" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-2/3" />
            </CardContent>
          </Card>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white p-4 sm:p-6">
      <div className="max-w-3xl mt-20 mx-auto">
        <Card className="bg-zinc-900/90 border-zinc-800 shadow-2xl">
          {/* Header */}
          <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-2 ring-zinc-800">
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

            <div className="text-center sm:text-left w-full">
              <CardTitle className="text-2xl sm:text-3xl font-bold">{user.name}</CardTitle>
              <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-zinc-400 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-zinc-300 hover:text-white"
                    onClick={handleCopyEmail}
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </span>
                {user.phone && (
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </span>
                )}
                {user.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </span>
                )}
              </div>

              {/* Quick stats */}
              <div className="mt-3 flex flex-wrap gap-2">
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
          </CardHeader>

          <CardContent className="px-4 sm:px-6 pb-6">
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {socialLinks.length > 0 ? (
                  socialLinks.map((link, i) => {
                    let host = link;
                    try {
                      host = new URL(link).hostname;
                    } catch {}
                    return (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-200 hover:bg-zinc-700 transition"
                      >
                        <LinkIcon className="h-4 w-4" />
                        {host}
                      </a>
                    );
                  })
                ) : (
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                    No social links added
                  </Badge>
                )}
              </div>
            </div>

            <Separator className="my-4 bg-zinc-800" />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-zinc-800/60">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* About */}
              <TabsContent value="about" className="mt-4 space-y-3">
                <p className="text-zinc-300">{user.bio || "No bio yet."}</p>
              </TabsContent>

              {/* Posts */}
              <TabsContent value="posts" className="mt-4">
                {postsLoading && <div className="text-zinc-400">Loading posts...</div>}
                {postsError && <div className="text-red-400">{postsError}</div>}
                {!postsLoading && posts.length === 0 && !postsError && (
                  <div className="text-zinc-400">No posts yet.</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
                    >
                      <div className="font-medium">{post.title}</div>
                      <p className="text-sm text-zinc-400 mt-1">{post.content}</p>
                      <p className="text-xs text-zinc-500 mt-2">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
