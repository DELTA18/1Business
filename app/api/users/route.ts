import { NextRequest,NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(req: NextRequest) {
    try {
        // await dbConnect();
        const users = await User.find({ registrationCompleted: true });
        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error("[GET_USERS_ERROR]", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }

}