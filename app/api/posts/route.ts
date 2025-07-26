import { NextRequest,NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import BusinessPost from '@/models/BusinessPost';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const json = formData.get("json");
    const image = formData.get("image");

    const data = JSON.parse(json as string);

    const newPost = new BusinessPost({
      ...data,
      imageUrl: "", // will be updated after upload if needed
    });

    // Optional: handle image upload to Cloudinary or local server here

    await newPost.save();

    return NextResponse.json({ success: true, message: "Post saved" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to save post" }, { status: 500 });
  }
}
