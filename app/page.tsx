import { Session } from "next-auth";
import { auth } from "@/lib/auth";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const session: Session | null = await auth();
  console.log(session?.user?.googleId, "session user id");

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    cache: "no-store",
  });
  const data = await res.json();
  const posts = data.posts || [];

  return <HomeClient session={session} posts={posts} userId={session?.user?.googleId} />;
}