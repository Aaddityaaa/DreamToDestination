import { loginUser  } from "@/controllers/user.controller";
import connectDB from "@/db";   

export async function POST(request) {
  await connectDB();        
  return await loginUser (request);
}