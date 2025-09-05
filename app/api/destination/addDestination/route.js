import { addDestination } from "@/controllers/destination.controller";

export async function POST(request) {
    return await addDestination(request);
}