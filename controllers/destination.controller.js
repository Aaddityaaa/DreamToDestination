import connectDB from "@/db";
import { Destination } from "@/models/destination.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextResponse } from "next/server";

connectDB();

const addDestination = async (request) => {
  try {
    const { title, description, price, days } = await request.json()

    if (
      !title || typeof title !== "string" || title.trim() === "" ||
      !description || typeof description !== "string" || description.trim() === "" ||
      price === undefined || price === null || typeof price !== "number" ||
      days === undefined || days === null || typeof days !== "number"
    ) {
      return NextResponse.json(new ApiError(409, "All fields are required and must be valid!"), { status: 409 });
    }

    const existedDestination = await Destination.findOne({ title })

    if (existedDestination) {
      return NextResponse.json(new ApiError(400, "Destination already exist with this title!"), { status: 400 })
    }

    // create destination 
    const destination = await Destination.create({
      title,
      description,
      price,
      days,
    });

    const createdDestination = await Destination.findById(destination._id)

    if (!createdDestination) {
      return NextResponse.json(new ApiError(500, "Something went wrong while creating destination!"), { status: 500 })
    }

    return NextResponse.json(new ApiResponse(201, createdDestination, "Destination successfully created"), { status: 201 })

  } catch (error) {
    console.log("Package Upload error : ", error)
    return NextResponse.json(new ApiError(error.statusCode || 500, error.message), { status: error.statusCode || 500 })
  }
};

export { addDestination }