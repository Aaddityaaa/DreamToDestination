import { NextResponse } from "next/server";
import connectDB from "@/db";
import { User } from "@/models/user.model";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select("-password").lean();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}