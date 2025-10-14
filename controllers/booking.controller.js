import { NextResponse } from "next/server";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { Booking } from "@/models/booking.model";
import { User } from "@/models/user.model";
import { Destination } from "@/models/destination.model";
import { Detail } from "@/models/detail.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { sendMail } from "@/utils/SendEmail";

const JWT_SECRET = process.env.JWT_SECRET;

const generateOTP = () => {
    let otp = "";
    for(let i=0; i<6; i++){
        otp += String(Math.floor(Math.random()*10)) 
    }
    return otp;
}

const bookTour = async (request) => {
    try{
        const cookieStore = await cookies();
        const tokenCookie = await cookieStore.get("token")?.value;
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
            const errorData = await currentUserResponse.json();
            return NextResponse.json(new ApiError(currentUserResponse.status, errorData?.message || "Failed to fetch current user"), {status: currentUserResponse.status});
        }


        const currentUser = await currentUserResponse.json(); 
        // console.log("Current User:", currentUser);
        const userData = currentUser.data?.user;
        const userEmail = userData?.email;
        const userName = userData?.username;
        // console.log("User Data:", userData);
        
        if (!userData) {
            return NextResponse.json(
                new ApiError(400, "Invalid user data received."),
                { status: 400 }
            );
        }

        const {phoneNumber,address,gender,aadharCard,detail} = await request.json()

        if (!aadharCard || !phoneNumber || !address || !gender || !detail) {
            return NextResponse.json(
                new ApiError(400, "Missing required fields: phoneNumber, address, gender, aadharCard."),
                { status: 400 }
            );
        }

        const detailData = await Detail.findOne({slug : `${detail}`});
        const detailId = detailData?._id 
        const detailName = detailData.title
        const detailInfo = detailData?.description


        const existingBooking = await Booking.findOne({ user: userData.id });
        if (existingBooking) {
            return NextResponse.json(
                new ApiError(409, "You already have a booking. Only one booking per user is allowed."),
                { status: 409 } // Conflict status
            );
        }

        const otp = generateOTP()
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);


        //Booking Pending
        const newBooking = await Booking.create({
            user: userData.id,
            detailId,
            detailName,
            detailInfo,
            status: "pending",
            phoneNumber,
            aadharCard,
            address,
            gender,
            name: userName,
            email: userEmail,
            otp,
            otpExpiry,
            otpAttempts: 0,
        })
        await newBooking.populate("user")
        
    
        const emailResult = await sendMail(
            userEmail,
            "Dream to Destination!",
            `Hii ${userName}, thankyou for registering. Your otp is ${otp}`,
            `<h2>Hi ${userName},<p>Thankyou for registering, your otp is ${otp}</p></h2>`
        )

        if(!emailResult.success){
            console.warn('Email notification failed : ',emailResult.error)
        }else{
            console.log("Email send successfully with otp :" + otp)
        }

        const { otp: hiddenOtp, otpAttempts, ...safeBooking } = newBooking.toObject();


        return NextResponse.json(new ApiResponse(201, newBooking, "Booking is pending, verify OTP to confirm booking."), {status: 201});
    }catch(error){
        console.log("Booking error : ", error);
        if (error.name === "ValidationError") {
            if (error.errors.name) {
                return NextResponse.json(new ApiError(400, error.errors.name.message), { status: 400 });
            }
            if (error.errors.email) {
                return NextResponse.json(new ApiError(400, error.errors.email.message), { status: 400 });
            }
            if (error.errors.phoneNumber) {
                return NextResponse.json(new ApiError(400, error.errors.phoneNumber.message), { status: 400 });
            }
            return NextResponse.json(
                new ApiError(400, error.message || "Validation failed."),
                { status: 400 }
            );
        }
        if (error.code === 11000) {
            let message = "Duplicate data detected.";
            if (error.keyPattern?.user) {
                message = "You already have a booking.";
            } else if (error.keyPattern?.aadharCard) {
                message = "Aadhar card already in use.";
            } else if (error.keyPattern?.email) {
                message = "Email already in use.";
            }
            return NextResponse.json(new ApiError(409, message), { status: 409 });
        }
        return NextResponse.json(
            new ApiError(500, "Internal Server Error"),
            { status: 500 } // Fixed status from 501 to 500
        );
    }


}


const confirmTour = async (request) => {
    try{
        const {email,enteredOTP} = await request.json();

        if (!email || !enteredOTP || enteredOTP.length !== 6) {
            return NextResponse.json(
                new ApiError(400, "Email and 6-digit OTP are required."),
                { status: 400 }
            );
        }

        const checkBooking = await Booking.findOne({email, status: "pending"})
        .select("+otp +otpExpiry +otpAttempts")
        .populate("user")

        // console.log("Email found",checkBooking)

        if(!checkBooking){
            return NextResponse.json(new ApiError(404, "No pending Booking found on this email"),{status: 404})
        }

        if (new Date() > checkBooking.otpExpiry) {
            return NextResponse.json(
                new ApiError(400, "OTP has expired. Please create a new booking."),
                { status: 400 }
            );
        }

        if (checkBooking.otpAttempts >= 3) {
            checkBooking.status = "cancelled"; 
            await checkBooking.save();
            return NextResponse.json(
                new ApiError(400, "Too many failed attempts. Booking cancelled. Create a new one."),
                { status: 400 }
            );
        }

        // console.log("OTP Comparison Debug:", {
        //     storedOtp: checkBooking.otp,
        //     storedType: typeof checkBooking.otp,
        //     enteredOtp: enteredOTP,
        //     enteredType: typeof enteredOTP,
        //     match: checkBooking.otp === enteredOTP ? 'YES' : 'NO'
        // });

        if (checkBooking.otp !== enteredOTP) {
            checkBooking.otpAttempts += 1; 
            await checkBooking.save();
            return NextResponse.json(
                new ApiError(400, `Invalid OTP. Attempts left: ${3 - checkBooking.otpAttempts}`),
                { status: 400 }
            );
        }

        checkBooking.otp = undefined; // Clear for security
        checkBooking.otpExpiry = undefined;
        checkBooking.otpAttempts = 3; // Mark as used
        checkBooking.status = "booked"; // Confirmed
        await checkBooking.save();

        await checkBooking.populate("user");
        console.log(`OTP verified for booking ${checkBooking._id} by ${email}`);

        await sendMail(
            email,
            "Booking Confirmed - Dream to Destination",
            `Hi ${checkBooking.name}, your booking is confirmed! ID: ${checkBooking._id}.`,
            `<h2>Hi ${checkBooking.name},</h2><p>Your booking is confirmed! ID: <strong>${checkBooking._id}</strong>.</p>`
        );
        return NextResponse.json(
            new ApiResponse(200, checkBooking, "OTP verified successfully. Tour booked!"),
            { status: 200 }
        );
    }catch(error){
        console.error("OTP Verification error:", error);
        return NextResponse.json(
            new ApiError(500, "Verification failed: " + error.message),
            { status: 500 }
        );
    }
}

export { bookTour,confirmTour }