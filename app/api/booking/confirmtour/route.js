import connectDB from "@/db/index";
import { confirmTour } from "@/controllers/booking.controller";

export async function POST(request) {
    await connectDB();
    return await confirmTour(request)
}