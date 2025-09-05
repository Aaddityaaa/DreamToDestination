import { NextResponse } from "next/server";
import connectDB from "@/db";
import { Destination } from "@/models/destination.model";

export async function GET() {
    try{
        await connectDB();
        const destinations = await Destination.find().lean();
        return NextResponse.json({ destinations })
    }catch(error){
        console.log("Failed to fetch destinations : ", error);
        return NextResponse.json({ error: "Failed to fetch destinations"}, {status: 500})
    }
}