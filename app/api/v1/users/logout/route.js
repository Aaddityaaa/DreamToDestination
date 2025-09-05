import { logoutUser } from "@/controllers/user.controller";

export async function POST(request) {
  return logoutUser(request);
}