import { IncomingForm } from "formidable";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import connectDB from "@/db";
import { Destination } from "@/models/destination.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { uploadOnCloudinary } from "@/utils/cloudinary";

export const config = {
    api: {
        bodyParser: false, // Disable Next.js default body parser
    },
};

connectDB();

function bufferToStream(buffer) {
    const readable = new Readable({
        read() {
            this.push(buffer);
            this.push(null);
        },
    });
    return readable;
}

export async function POST(req) {
    const form = new IncomingForm({
        keepExtensions: true,
        uploadDir: path.join(process.cwd(), "/public/temp"),
    });

    try {
       
        // console.log("Env vars in API route:");
        // console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
        // console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "set" : "not set");
        // console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "set" : "not set");

        // Read entire request body as buffer
        const reqBuffer = Buffer.from(await req.arrayBuffer());

        // Create a fake request stream for formidable
        const fakeReq = bufferToStream(reqBuffer);
        fakeReq.headers = {};
        for (const [key, value] of req.headers.entries()) {
            fakeReq.headers[key.toLowerCase()] = value;
        }
        fakeReq.method = req.method;
        fakeReq.url = req.url;

        return await new Promise((resolve) => {
            form.parse(fakeReq, async (err, fields, files) => {
                if (err) {
                    console.error("Form parse error:", err);
                    resolve(
                        new Response(
                            JSON.stringify(new ApiError(500, "Error parsing the form data")),
                            { status: 500 }
                        )
                    );
                    return;
                }

                try {
                    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
                    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
                    const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
                    const days = Array.isArray(fields.days) ? fields.days[0] : fields.days;


                    // Validate inputs
                    if (
                        !title || typeof title !== "string" || title.trim() === "" ||
                        !description || typeof description !== "string" || description.trim() === "" ||
                        !price || isNaN(Number(price)) ||
                        !days || isNaN(Number(days))
                    ) {
                        resolve(
                            new Response(
                                JSON.stringify(new ApiError(400, "All fields including cover image are required and must be valid")),
                                { status: 400 }
                            )
                        );
                        return;
                    }
                    
                    console.log("Parsed fields:", fields);
                    console.log("Parsed files:", files);
                    const coverImage = Array.isArray(files.coverImage) ? files.coverImage[0] : files.coverImage;

                    if (!coverImage) {
                        console.log("No coverImage file uploaded");
                        resolve(
                            new Response(
                                JSON.stringify(new ApiError(400, "Cover image is required")),
                                { status: 400 }
                            )
                        );
                        return;
                    }

                    console.log("Cover image filepath:", coverImage.filepath);

                    

                    // Upload image to Cloudinary
                    const cloudinaryResponse = await uploadOnCloudinary(coverImage.filepath);

                    if (!cloudinaryResponse) {
                        resolve(
                            new Response(
                                JSON.stringify(new ApiError(500, "Failed to upload image to Cloudinary")),
                                { status: 500 }
                            )
                        );
                        return;
                    }

                    // Check if destination already exists
                    const existedDestination = await Destination.findOne({ title: title.trim() });
                    if (existedDestination) {
                        resolve(
                            new Response(
                                JSON.stringify(new ApiError(400, "Destination already exists with this title!")),
                                { status: 400 }
                            )
                        );
                        return;
                    }

                    // Create new destination
                    const destination = await Destination.create({
                        title: title.trim(),
                        description: description.trim(),
                        price: Number(price),
                        days: Number(days),
                        coverImage: cloudinaryResponse.secure_url,
                    });
                    console.log("New destination created:", destination);

                    resolve(
                        new Response(
                            JSON.stringify(new ApiResponse(201, destination, "Destination successfully created")),
                            { status: 201 }
                        )
                    );
                } catch (error) {
                    console.error("Upload error:", error);
                    resolve(
                        new Response(
                            JSON.stringify(new ApiError(500, error.message || "Internal Server Error")),
                            { status: 500 }
                        )
                    );
                } finally {
                    // Clean up temp uploaded file
                    const coverImage = Array.isArray(files.coverImage) ? files.coverImage[0] : files.coverImage;
                    if (coverImage && coverImage.filepath) {
                        fs.unlink(coverImage.filepath, (err) => {
                            if (err) console.error("Failed to delete temp file:", err);
                        });
                    }
                }
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return new Response(
            JSON.stringify(new ApiError(500, "Unexpected server error")),
            { status: 500 }
        );
    }
}
