import connectDB from "@/db/index";
import { findDetail } from "@/controllers/details.controller";

export async function GET(request , {params}) {
    await connectDB();
    return await findDetail(request, {params})
}