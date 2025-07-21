import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, phone, bio, profilePic, location, socialLinks } = body;

    const user = await User.findOneAndUpdate(
      { email },
      {
        phone,
        bio,
        profilePic,
        location,
        socialLinks,
        registrationCompleted: true,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("[REGISTER_STEP1_ERROR]", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
