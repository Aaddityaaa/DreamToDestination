import { User } from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextResponse } from "next/server";
import connectDB from "@/db/index";
import jwt from "jsonwebtoken";

connectDB();

const registerUser = async (request) => {
  try {
    const { username, email, password } = await request.json();

    if ([username, email, password].some(field => field?.trim() === "")) {
      return NextResponse.json(new ApiError(409, "All fields are required!"), { status: 409 });
    }

    // check if user is already existed or not
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return NextResponse.json(new ApiError(400, "User with this email already exists!"), { status: 400 });
    }

    // set user role by default 
    let userRole = "user";

    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
      role: userRole,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return NextResponse.json(new ApiError(500, "Something went wrong while creating the user!"), { status: 500 });
    }

    return NextResponse.json(new ApiResponse(201, createdUser, "User created successfully"), { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(new ApiError(error.statusCode || 500, error.message), { status: error.statusCode || 500 });
  }
};

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

const loginUser = async (request) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(new ApiError(401, "Email and password are required!"), { status: 401 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(new ApiError(401, "User does not exist!"), { status: 401 });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    
    if (!isPasswordValid) {
      const error = new ApiError(401, "Invalid password!");
        return NextResponse.json({
          statusCode: error.statusCode,
          success: error.success,
          message: error.message,
          errors: error.errors,
            data: error.data,
          }, { status: error.statusCode });
    }

    // create JWT payload
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    }

    // sign jwt token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });


    const response = NextResponse.json(
      new ApiResponse(200, { user: { id: user._id, username: user.username, email: user.email, role: user.role } }, "User  logged in successfully")
    )
    // set token in HttpOnly cookies
    response.cookies.set("token",token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600, // 1 hour in seconds
      path: "/",
      sameSite: "strict",
    })
    
    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(new ApiError(error.statusCode || 500, error.message), { status: error.statusCode || 500 });
  }
};

const logoutUser = async (request) => {
  
  const response = NextResponse.json(
    new ApiResponse(200, {}, "User  logged out successfully"),
    { status: 200 }
  );

  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0, // expire immediately
    path: "/",
    sameSite: "strict",
  });
  return response;
};

export {
  registerUser,
  loginUser,
  logoutUser,
};
