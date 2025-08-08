import { NextResponse } from "next/server";
import Post from "@/models/BusinessPost";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ Await params

  const post = await Post.findById(id);
  console.log("hola");

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}
