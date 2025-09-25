import { NextResponse } from "next/server";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { Booking } from "@/models/booking.model";
import { User } from "@/models/user.model";
import { Destination } from "@/models/destination.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

const bookTour = async (request) => {
    try{
        const cookieStore = cookies();
        const tokenCookie = cookieStore.get("token")?.value;
        const cookieHeader = tokenCookie ? `token=${tokenCookie}` : ""; // Build minimal Cookie header

        const currentUserResponse = await fetch("http://localhost:3000/api/v1/users/current", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(cookieHeader && { Cookie: cookieHeader }), // Forward the token cookie
                // Forward Authorization header if present (fallback for Bearer tokens)
                ...Object.fromEntries(
                    Array.from(request.headers.entries()).filter(([key]) =>
                        key.toLowerCase() === "authorization"
                    )
                ),
            },
        });
        if (!currentUserResponse.ok) {
            return NextResponse.json(new ApiError(currentUserResponse.status, errorData.message || "Failed to fetch current user"), {status: currentUserResponse.status});
        }
        const currentUser = await currentUserResponse.json(); 
        const userData = await currentUser.data?.user;

        if (!userData) {
            return NextResponse.json(
                new ApiError(400, "Invalid user data received."),
                { status: 400 }
            );
        }

        
        return NextResponse.json(new ApiResponse(200, userData, "Current user fetched successfully"), {status: 200});
    }catch(error){
        return NextResponse.json(new ApiError(500, "Internal Server Error"), {status: 501});
    }
}

export { bookTour }