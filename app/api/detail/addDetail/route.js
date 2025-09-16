import connectDB from "@/db/index";
import { addDetails } from "@/controllers/details.controller";

export async function POST(request){
    await connectDB();
    return await addDetails(request);
}