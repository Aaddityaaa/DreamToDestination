import { v2 as cloudinary } from "cloudinary";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file (if you use dotenv)
dotenv.config();

console.log("Loaded env vars:");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "set" : "not set");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function testUpload() {
  // Adjust the path to point to an existing image in your temp folder
  const filePath = path.join(process.cwd(), "public/temp/v86ckujk1abr6lvj6jb84gzww.jpg");

  try {
    console.log("Uploading file:", filePath);
    const result = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
    console.log("Upload successful! URL:", result.secure_url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

testUpload();
