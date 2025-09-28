import { auth } from "@/lib/auth";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const session = await auth(); // 👈 no explicit Session type
  console.log('--------------------',session?.user?.googleId);

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    cache: "no-store",
  });
  const data = await res.json();
  const posts = data.posts || [];

  return <HomeClient session={session} posts={posts} userId={session?.user?.googleId} />;
}
