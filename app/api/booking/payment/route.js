import { initiatePayment } from "@/controllers/booking.controller";


export async function POST(request) {
    return await initiatePayment(request)
}