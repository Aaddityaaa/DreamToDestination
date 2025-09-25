import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";
import { Destination } from "./destination.model";

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: "Destination",
        required: true,
    },
    status: {
        type: String,
        default: "not booked"
    }
},
{
    timestamps: true
})

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export { Booking }