import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be atleast 8 character long"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
    },
    {timestamps: true}
)

// Encrypt the password before saving it to database
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    try{
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash;
        next();
    }catch(err){
        next(err);
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };