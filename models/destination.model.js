import mongoose, {Schema} from "mongoose";

const destinationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        coverImage: {
            type: String, // cloudinary url
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        days: {
           type: Number,
           required: true 
        }
    },
    {timestamps: true}
)

const Destination = mongoose.models.Destination || mongoose.model("Destination", destinationSchema);

export { Destination };