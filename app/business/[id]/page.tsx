import { notFound } from "next/navigation";
import PostDetailsClient from "./PostDetailsClient";

export default async function BusinessPostPage(
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Single network request for post + related
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const { post, relatedPosts } = await res.json();
  if (!post) return notFound();

  return <PostDetailsClient post={post} relatedPosts={relatedPosts || []} />;
}
