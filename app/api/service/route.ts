import { NextResponse } from "next/server";
import  dbConnect  from "@/lib/mongoose";
import { Service } from "@/models/Service";

export async function POST(req: Request) {
    console.log("Post request received");
    try{
        await dbConnect();
        const body = await req.json();
        console.log(body);
        const newService = new Service(body);
        console.log(newService);
        await newService.save();
        return NextResponse.json({success: true, message: "Service created successfully"}, {status: 201});
    }
    catch(error){
        console.error("GET error:", error);
        return NextResponse.json({success: false, message: "Server Error"}, {status: 500});
    }
}

export async function GET(req: Request) {
    const params = new URL(req.url).searchParams;
    const userId = params.get("googleId")
    try{
        await dbConnect();
        const services = await Service.find({userId}).sort({createdAt: -1});
        console.log(services);

        return NextResponse.json({success: true, services: services}, {status:200});

    }
    catch(error){
        console.error("GET error:", error);
        return NextResponse.json({success: false, message: "Server Error"}, {status: 500});
    }
}