import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import BusinessPost from "@/models/BusinessPost";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await dbConnect();

    // Find the main post
    const post = await BusinessPost.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Find related posts (same businessType, excluding current post)
    const relatedPosts = await BusinessPost.find({
      _id: { $ne: id },
      businessType: post.businessType,
    })
      .sort({ createdAt: -1 })
      .limit(6);

    return NextResponse.json({ post, relatedPosts });
  } catch (err) {
    console.error("[GET_POST_WITH_RELATED_ERROR]", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
