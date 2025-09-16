import { NextResponse } from "next/server";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { Detail } from "@/models/detail.model";
import connectDB from "@/db/index";

const addDetails = async (request) => {
    try{
        const {title,description, maxGroupSize, price, itinerary, includes, excludes,  packages, tripHighlights, importantNotes } = await request.json();

        if(
            !title || typeof title !== "string" || title.trim() === "" ||
            !description || typeof description !== "string" || description.trim() === "" ||
            maxGroupSize === undefined || maxGroupSize === null || typeof maxGroupSize !== "number" ||
            price === undefined || price === null || typeof price !== "number" ||
            !itinerary || !includes || !excludes || !packages || !tripHighlights || !importantNotes
         ){
           return NextResponse.json(new ApiError(409, "All fields are reqired!"), {status: 409}) 
         }

         const detail = await Detail.create({
            title,
            description, 
            maxGroupSize, 
            price, 
            itinerary, 
            includes, 
            excludes,  
            packages, 
            tripHighlights, 
            importantNotes,
         })

         const createdDetail = await Detail.findById(detail._id)

         if(!createdDetail){
            return NextResponse.json(new ApiError(500, "Something went wrong while creating detail!"), {status: 500})
         }

         return NextResponse.json(new ApiResponse(201,createdDetail, "Details created successfully!!"), {status: 201})


    }catch(error){
        console.log("Detail Upload error : ", error)
        return NextResponse.json(new ApiError(error.statusCode || 500, error.message), { status: error.statusCode || 500 })
    }
}

const findDetail = async (request, {params}) => {
    try{
        const { slug } = params;

        const detail = await Detail.findOne({ slug }).lean();

        if(!detail){
            return NextResponse.json(new ApiError(404, "Detail not found!"), {status: 404})
        }

        return NextResponse.json(new ApiResponse(200, detail, "Detail fetched successfully!!"), {status: 200})
    }catch(error){
        console.log("Find detail error : "+ error);
        return NextResponse.json(new ApiError(error.statusCode || 500, error.message), { status: error.statusCode || 500 })
    }
}
export { addDetails, findDetail }