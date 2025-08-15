import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";


export async function GET(req: NextRequest) {
//   await dbConnect();
  
  const googleId = req.nextUrl.searchParams.get("googleId");

  if (!googleId) {
    return NextResponse.json({ success: false, error: "Missing googleId" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ googleId, registrationCompleted: true });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("[GET_USER_ERROR]", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
