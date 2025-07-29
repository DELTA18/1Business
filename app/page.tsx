import { auth } from "./api/auth/[...nextauth]/route";
import BusinessPostDisplay from "@/components/BusinessPostDisplay";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const session = await auth();
  console.log(session?.user?.googleId, "session user id");
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    cache: "no-store",
  });
  const data = await res.json();
  const posts = data.posts || [];

  return <HomeClient session={session} posts={posts} />;
}
