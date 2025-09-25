import connectDB from "@/db/index";
import { bookTour } from "@/controllers/booking.controller";

export async function GET(request) {
    await connectDB();
    return await bookTour(request);
}