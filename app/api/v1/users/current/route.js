import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {

  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("Decoded JWT:", decoded);
    
    // Return user info except password
    return NextResponse.json({
        data: {
            user: {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email,
                role: decoded.role
            }
        },
        message: "Current user fetched successfully",
    });

  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}