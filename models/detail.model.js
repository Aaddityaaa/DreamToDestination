import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const detailSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    maxGroupSize: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    itinerary: [
        {
            day: Number,
            title: String,
            activities: String,
            activitiesPoints: [String],
        }
    ],
    includes: [String],
    excludes: [String],
    packages: [
        {
            type: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date,
                required: true
            },
            durationDays: {
                type: Number,
                required: true
            },
            availability: {
                type: Number,
                required: true
            },

        }
    ],
    tripHighlights: [String],
    importantNotes: [String],
    
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    destinations: {
        type: Schema.Types.ObjectId,
        ref: "Destination"
    },

})

// Pre-save hook to generate slug from title
detailSchema.pre('validate', function(next) {
    if (this.title && !this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Detail = mongoose.models.Detail || mongoose.model("Detail", detailSchema)

export { Detail }