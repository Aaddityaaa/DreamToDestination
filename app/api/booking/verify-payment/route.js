import { verifyPayment } from "@/controllers/booking.controller";

export async function POST(request){
    return await verifyPayment(request) 
    
}