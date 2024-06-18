import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import cloudinary from "cloudinary";
import AppError from "../utils/error.utils.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

export const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new AppError("User already exist with this email id", 400));
  }

  //file upload
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    return next(new AppError("Avatar file is required", 400));
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    return next(new AppError("Avatar file is required", 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: avatar.url,
  });

  if (!user) {
    return next(new AppError("User registration failed,Please try again", 400));
  }

  await user.save();
  user.password = undefined;

  const token = await user.generateJwtToken();
  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User register successufully",
    user,
  });
};

// login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Email or Password does not match", 400));
    }

    const token = await user.generateJwtToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// logout
export const logout = (req, res, next) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logout successfully",
  });
};

// get profile
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch user details", 500));
  }
};

//update the user profile
export const update = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    const id = req.user.id;

    if (!fullName) {
      return next(new AppError("Fullname is required", 400));
    }

    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
      return next(new AppError("Avatar file is missing", 400));
    }

    //delete old image
    if (req.user?.avatar) {
      await cloudinary.v2.uploader.destroy(req.user?.avatar);
    }

    //save new updated file
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar.url) {
      return next(new AppError("Error while uploading on server", 400));
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          fullName,
          avatar: avatar.url,
        },
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return next(new AppError("Failed to update user,please try again", 400));
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return next(new AppError("Failed the user updation", 500));
  }
};
