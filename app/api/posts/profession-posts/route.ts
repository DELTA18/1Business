import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { ProfessionPost } from "@/models/Service";

// CREATE a new Profession Post
export async function POST(req: Request) {
  try {
    const body = await req.json();  
    await dbConnect();

    const newPost = await ProfessionPost.create(body);

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

// GET all Profession Posts
export async function GET() {
  try {
    await connectDB();
    const posts = await ProfessionPost.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
