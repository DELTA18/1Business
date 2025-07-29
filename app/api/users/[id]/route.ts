import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import  User  from "@/models/User";
import dbConnect from "@/lib/mongoose";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const user = await User.findOne({ googleId: params.id });
    if (!user) {
      // Handle no user case
      return NextResponse.json({
        name: "Anonymous User",
        image: "/default-avatar.png",
      });
    }

    return NextResponse.json({
      name: user.name,
      image: user.image || "/default-avatar.png",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
