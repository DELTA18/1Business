import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Await params before accessing
    const { id } = await context.params;

    const user = await User.findOne({ googleId: id });
    if (!user) {
      // Return default user data if not found
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
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
