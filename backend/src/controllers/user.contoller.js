import User from "../models/user.model.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import validator from "validator";
import { uploadoncloudinary } from "../utils/cloudinary.js";

//user sign up
const register = asynchandler(async (req, res) => {
  const { email, password, fullName, bio } = req.body;

  if (!email || !password || !fullName || !bio) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json(new ApiResponse(400, {}, "invalid email"));
  }

  try {
    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "user already exist"));
    }

    const newUser = await User.create({
      email,
      password,
      fullName,
      bio,
    });

    await newUser.save({ validateBeforeSave: false });

    const user = await User.findById(newUser._id).select("-password");

    const token = user.generatetoken();
    if (!token) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "something went wrong"));
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(200, { user, token }, "user registered successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Unable to register user", error);
  }
});

//user login
const login = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json(new ApiResponse(400, {}, "invalid email"));
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "password must be at least 6 characters"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(new ApiResponse(400, {}, "user not found"));
    }

    const ispasswordcorrect = await user.isPasswordCorrect(password);

    if (!ispasswordcorrect) {
      return res.status(400).json(new ApiResponse(400, {}, "invalid password"));
    }

    const token = user.generatetoken();
    if (!token) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "something went wrong"));
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(200, { user, token }, "user logged in successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Unable to login user", error);
  }
});

//update user profile
const updateProfile = asynchandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json(new ApiResponse(401, {}, "Login to continue"));
  }

  const { fullName, bio } = req.body;
  const image = req.file?.path;

  if (!fullName || !bio) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  try {
    const updateduser = await User.findByIdAndUpdate(user._id, {
      fullName,
      bio,
    });

    if (image) {
      const response = await uploadoncloudinary(image);

      if (!response) {
        return res
          .status(500)
          .json(new ApiResponse(500, {}, "something went wrong"));
      }

      await User.findByIdAndUpdate(user._id, {
        profilePic: response.url,
      });
    }

    const updatedUser = await User.findById(user._id).select("-password");

    res
      .status(200)
      .json(
        new ApiResponse(200, { updatedUser }, "Profile updated successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Unable to update profile", error);
  }
});

//get user profile
const getProfile = asynchandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json(new ApiResponse(401, {}, "Login to continue"));
  }

  const UserProfile = await User.findById(user._id).select("-password");

  res.status(200).json(new ApiResponse(200, { UserProfile }, "success"));
});

export { register, login, updateProfile, getProfile };
