import mongoose, {Schema} from "mongoose";
import slugify from "slugify";

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
        },
        detail: {
            type: String,  // detail _id
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }
    },
    {timestamps: true}
)

// Pre-save hook to generate slug from title
destinationSchema.pre('validate', function(next) {
    if (this.title && !this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Destination = mongoose.models.Destination || mongoose.model("Destination", destinationSchema);

export { Destination };