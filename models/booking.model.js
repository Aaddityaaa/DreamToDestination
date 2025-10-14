import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";
import { Destination } from "./destination.model";

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    detailId: {
        type: String,
    },
    detailName: {
        type: String,
    },
    detailInfo: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending","verified","booked","cancelled"],
        default: "pending",
    },
    otp: {
        type: String,
        select: false, //Hide from response
    },
    otpExpiry: {
        type: Date,
    },
    otpAttempts: {
        type: Number,
    },
    phoneNumber: {
        type: Number,
        minlength: [10, "Phone Number must be 10 character long"],
        maxlength: [10, "Phone Number must be only 10 character long"],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
        set: (value) => value.toLowerCase()
    },
    aadharCard: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: [true, "Name is required for booking."], 
    },
    email: {
        type: String,
        required: [true, "Email is required for booking."],
        unique: true,
    },
},
{
    timestamps: true,
    strict: 'throw',
})

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export { Booking }