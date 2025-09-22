"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Mail,
  Phone,
  Copy,
  Check,
  Pencil,
  Plus,
  Star,
  ExternalLink,
} from "lucide-react";

// --- types ---
type UserType = {
  googleId: string;
  name: string;
  email: string;
  image?: string;
  profilePic?: string;
  bio?: string;
  phone?: string;
  location?: string;
  socialLinks?: string[];
  accountTypes?: string[];
};

type Item = {
  _id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  type?: "post" | "service" | "asset";
  createdAt?: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const profileId = params?.id as string | undefined;

  const [user, setUser] = useState<UserType | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("about");

  // content lists
  const [posts, setPosts] = useState<Item[]>([]);
  const [services, setServices] = useState<Item[]>([]);
  const [assets, setAssets] = useState<Item[]>([]);
  const [contentLoading, setContentLoading] = useState(false);

  // pinned & contributions
  const [pinned, setPinned] = useState<Item[]>([]);
  const [contribs, setContribs] = useState<Record<string, number>>({});

  // ui states
  const [copied, setCopied] = useState(false);
  const [following, setFollowing] = useState(false);
  const isOwner = useMemo(() => session?.user?.googleId === profileId, [session, profileId]);

  // --- fetch user ---
  useEffect(() => {
    if (!profileId) return;
    setLoadingUser(true);
    (async () => {
      try {
        const res = await fetch(`/api/users?googleId=${encodeURIComponent(profileId)}`);
        const data = await res.json();
        if (!data?.success) throw new Error(data?.error || "User not found");
        setUser(data.user as UserType);
      } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error(err);
        setError("Failed to load user");
      }
      } finally {
        setLoadingUser(false);
      }
    })();
  }, [profileId]);

  // --- fetch content lazily ---
  useEffect(() => {
    if (!profileId) return;
    const load = async () => {
      setContentLoading(true);
      try {
        if (activeTab === "posts") {
          const res = await fetch(`/api/posts?googleId=${encodeURIComponent(profileId)}`);
          const d = await res.json();
          setPosts(d.success ? d.posts : []);
        }
        if (activeTab === "services") {
          const res = await fetch(`/api/service?googleId=${encodeURIComponent(profileId)}`);
          const d = await res.json();
          console.log(d);
          setServices(d.success ? d.services : []);
        }
        if (activeTab === "assets") {
          const res = await fetch(`/api/assets?googleId=${encodeURIComponent(profileId)}`);
          const d = await res.json();
          setAssets(d.success ? d.assets : []);
        }
        if (activeTab === "activity") {
          // optional: fetch activity
        }
      } catch {
  console.error("Failed to fetch content");
      } finally {
        setContentLoading(false);
      }
    };
    load();
  }, [activeTab, profileId]);

  // --- pinned & contributions (fetch once) ---
  useEffect(() => {
    if (!profileId) return;
    (async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`/api/pinned?googleId=${encodeURIComponent(profileId)}`),
          fetch(`/api/contributions?googleId=${encodeURIComponent(profileId)}`),
        ]);
        const pJson = await pRes.json();
        const cJson = await cRes.json();
        setPinned(pJson.success ? pJson.items : []);
        setContribs(cJson.success ? cJson.contribs || {} : {});
      } catch {
        console.error("Failed to fetch pinned & contributions");
      }
    })();
  }, [profileId]);

  const handleCopyProfile = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleFollow = async () => {
    if (!profileId) return;
    try {
      // optimistic toggle (backend optional)
      setFollowing((f) => !f);
      await fetch(`/api/users/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetGoogleId: profileId }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openCreate = (type: "post" | "service" | "asset") => {
    if (type === "post") router.push("/create/businesspost/step1");
    if (type === "service") router.push("/create/service/step1");
    if (type === "asset") router.push("/create/asset/step1");
  };

  // contributions heatmap helper
  const renderHeatmap = () => {
    // contribs expected as { '2025-09-01': 2, ... }
    const days = 90; // last 90 days
    const arr: { date: string; count: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      arr.push({ date: iso, count: contribs[iso] || 0 });
    }

    return (
      <div className="grid grid-cols-18 gap-1">
        {arr.map((d) => {
          const level = d.count === 0 ? 0 : d.count < 2 ? 1 : d.count < 5 ? 2 : 3;
          const bg = level === 0 ? "bg-zinc-800" : level === 1 ? "bg-green-700" : level === 2 ? "bg-green-500" : "bg-green-400";
          return (
            <div key={d.date} title={`${d.date}: ${d.count} contribution(s)`} className={`${bg} w-3 h-3 rounded-sm`} />
          );
        })}
      </div>
    );
  };

  if (loadingUser || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black text-white p-6">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
          <div className="md:col-span-8">
            <Skeleton className="h-8 w-3/5 mb-4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "User not found"}</p>
          <Button onClick={() => location.reload()} className="bg-blue-600">Try again</Button>
        </div>
      </div>
    );
  }

  const avatarSrc = user.profilePic || user.image || "/default-avatar.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      <div className="max-w-6xl mx-auto p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 mt-20">
        {/* LEFT SIDEBAR */}
        <aside className="md:col-span-4 sticky top-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 ring-2 ring-zinc-800">
                <AvatarImage src={avatarSrc} alt={user.name} />
                <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  {isOwner && (
                    <Button size="sm" variant="outline" onClick={() => router.push(`/settings/profile`)}>
                      <Pencil className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  )}
                </div>
                <div className="text-sm text-zinc-400 mt-1">{user.bio}</div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" onClick={() => openCreate("post")} className="bg-blue-600">
                <Plus className="w-4 h-4 mr-2" /> Post
              </Button>
              <Button size="sm" onClick={() => openCreate("service")} className="bg-green-600">
                <Plus className="w-4 h-4 mr-2" /> Service
              </Button>
              <Button size="sm" onClick={() => openCreate("asset")} className="bg-purple-600">
                <Plus className="w-4 h-4 mr-2" /> Asset
              </Button>
            </div>

            <div className="mt-4 text-sm space-y-2">
              <div className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-4 h-4" /> <span className="truncate">{user.email}</span>
                <button onClick={handleCopyProfile} className="ml-auto text-zinc-400 hover:text-white">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2 text-zinc-300"><Phone className="w-4 h-4" /> {user.phone}</div>
              )}
              {user.location && (
                <div className="flex items-center gap-2 text-zinc-300"><MapPin className="w-4 h-4" /> {user.location}</div>
              )}
            </div>

            <Separator className="my-4" />

            {/* stats */}
            <div className="flex gap-3 flex-wrap">
              <div className="p-3 rounded-lg bg-zinc-800 text-center w-1/3">
                <div className="text-xl font-semibold">{/* posts length may not be loaded */}—</div>
                <div className="text-xs text-zinc-400">Posts</div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-800 text-center w-1/3">
                <div className="text-xl font-semibold">0</div>
                <div className="text-xs text-zinc-400">Followers</div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-800 text-center w-1/3">
                <div className="text-xl font-semibold">—</div>
                <div className="text-xs text-zinc-400">Views</div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* pinned */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-zinc-300 font-medium">Pinned</div>
                <Badge className="bg-zinc-800">{pinned.length}</Badge>
              </div>
              <div className="grid gap-3">
                {pinned.length === 0 && <div className="text-sm text-zinc-500">No pinned items</div>}
                {pinned.slice(0, 4).map((it, idx) => (
                  <div key={idx} className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-800">
                    <div className="text-sm font-semibold">{it.title}</div>
                    <div className="text-xs text-zinc-500 mt-1">{it.type}</div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* contributions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-zinc-300 font-medium">Contributions</div>
                <span className="text-xs text-zinc-500">last 90 days</span>
              </div>
              <div className="mt-2">{renderHeatmap()}</div>
            </div>

            <div className="mt-6">
              <div className="flex gap-2">
                <Button onClick={handleFollow} className={`flex-1 ${following ? "bg-zinc-700" : "bg-blue-600"}`}>
                  <Star className="w-4 h-4 mr-2" /> {following ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" onClick={() => router.push(`/share/${profileId}`)}>
                  <ExternalLink className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="md:col-span-8">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 shadow-lg">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(String(v))}>
              <TabsList className="bg-transparent mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="posts">Business Posts</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="pt-2">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300">{user.bio || "No bio yet."}</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-zinc-400">Skills / Areas</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(user.accountTypes || []).map((a, i) => (
                            <Badge key={i} className="bg-zinc-800 text-zinc-200">{a}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-zinc-400">Social Links</div>
                        <div className="mt-2 flex flex-col gap-2">
                          {(user.socialLinks || []).map((s, i) => (
                            <a key={i} href={s} target="_blank" rel="noreferrer" className="text-sm text-blue-400">{s}</a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="posts">
                {contentLoading ? (
                  <div className="grid gap-4">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-zinc-400 py-12 text-center">
                    <div className="mb-4">No business posts yet.</div>
                    <Button onClick={() => openCreate("post")} className="bg-blue-600">Create your first post</Button>
                  </div>
                ) : (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((p) => (
                      <div key={p._id} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col">
                        <div className="text-lg font-semibold">{p.title}</div>
                        <p className="text-sm text-zinc-400 mt-2 line-clamp-3">{p.content}</p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="text-xs text-zinc-500">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""}</div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">View</Button>
                            {isOwner && <Button variant="ghost" size="sm">Edit</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="services">
                {contentLoading ? (
                  <Skeleton className="h-40 w-full rounded-lg" />
                ) : services.length === 0 ? (
                  <div className="text-zinc-400 py-12 text-center">
                    <div className="mb-4">No services listed yet.</div>
                    <Button onClick={() => openCreate("service")} className="bg-green-600">Add a service</Button>
                  </div>
                ) : (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s) => (
                      <div key={s._id} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                        <div className="font-semibold">{s.name}</div>
                        <p className="text-sm text-zinc-400 mt-2 line-clamp-4">{s.description}</p>
                        <p className="mt-2 text-sm text-zinc-300">Price: ₹ {s.askingPrice}  - ({s.availability})</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-sm text-zinc-400">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ""}</div>
                          <div>
                            <Button variant="ghost" size="sm">View</Button>
                            {isOwner && <Button variant="ghost" size="sm">Edit</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="assets">
                {contentLoading ? (
                  <Skeleton className="h-40 w-full rounded-lg" />
                ) : assets.length === 0 ? (
                  <div className="text-zinc-400 py-12 text-center">
                    <div className="mb-4">No assets listed yet.</div>
                    <Button onClick={() => openCreate("asset")} className="bg-purple-600">List an asset</Button>
                  </div>
                ) : (
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {assets.map((a) => (
                      <div key={a._id} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                        <div className="font-semibold">{a.title}</div>
                        <p className="text-sm text-zinc-400 mt-2 line-clamp-2">{a.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-sm text-zinc-400">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ""}</div>
                          <div>
                            <Button variant="ghost" size="sm">View</Button>
                            {isOwner && <Button variant="ghost" size="sm">Edit</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="activity">
                <div className="text-zinc-400">Recent activity will appear here.</div>
              </TabsContent>

              <TabsContent value="settings">
                {isOwner ? (
                  <div className="space-y-4">
                    <div className="text-zinc-300">Account & profile settings live in the settings area.</div>
                    <div className="flex gap-3">
                      <Button onClick={() => router.push('/settings/profile')}>Edit Profile</Button>
                      <Button variant="outline" onClick={() => router.push('/settings/account')}>Account</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-zinc-400">Settings are visible only to the profile owner.</div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
