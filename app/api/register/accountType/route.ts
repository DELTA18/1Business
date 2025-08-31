// api/register/accountType/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log("[REGISTER_ACCOUNTTYPE_BODY]", body);

    const { googleId, accountTypes } = body;

    if (!googleId || !accountTypes || !Array.isArray(accountTypes)) {
      console.warn("[REGISTER_ACCOUNTTYPE_VALIDATION_FAIL]", { googleId, accountTypes });
      return NextResponse.json(
        { success: false, error: "googleId and accountTypes (array) are required" },
        { status: 400 }
      );
    }

    // --- DEBUG: check if user exists before update ---
    const before = await User.findOne({ googleId }).lean();
    console.log("[FOUND_USER_BEFORE_UPDATE]", !!before, before ? { _id: before._id, googleId: before.googleId } : null);

    if (!before) {
      return NextResponse.json(
        { success: false, error: "User not found for provided googleId" },
        { status: 404 }
      );
    }

    // Explicit $set + runValidators
    const updated = await User.findOneAndUpdate(
      { googleId },
      { $set: { accountTypes } },
      { new: true, runValidators: true }
    ).lean();

    console.log("[FOUND_USER_AFTER_UPDATE]", !!updated, updated ? { _id: updated._id, accountTypes: updated.accountTypes } : null);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Failed to update accountTypes" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("[REGISTER_ACCOUNTTYPE_ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
