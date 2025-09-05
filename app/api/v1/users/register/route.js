import { registerUser  } from "@/controllers/user.controller";
import connectDB from "@/db";


export async function POST(request) {
  await connectDB();    
  return await registerUser (request);
}