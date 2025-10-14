import connectDB from "@/db/index";
import { bookTour } from "@/controllers/booking.controller";

export async function POST(request) {
    await connectDB();
    return await bookTour(request);
}