import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import BusinessPost from "@/models/BusinessPost";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    const newPost = new BusinessPost({
      ...body,
    });

    await newPost.save();

    return NextResponse.json({ success: true, message: "Post saved" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to save post" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const googleId = searchParams.get("googleId");
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    let query: any = {};
    if (googleId) {
      query = { userId: googleId }; // fetch only posts of that user
    }

    await dbConnect();

    // ✅ fetch posts with pagination
    const posts = await BusinessPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // ✅ count total posts for this query
    const totalCount = await BusinessPost.countDocuments(query);

    return NextResponse.json({ success: true, posts, totalCount });
  } catch (error) {
    console.error("[GET_POSTS_ERROR]", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
