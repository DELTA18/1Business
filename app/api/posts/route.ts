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
    await dbConnect();
    const posts = await BusinessPost.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("[GET_POSTS_ERROR]", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
