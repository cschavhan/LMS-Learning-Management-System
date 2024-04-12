import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

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

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: "",
      secure_url: "",
    },
  });

  if (!user) {
    return next(new AppError("User registration failed,Please try again", 400));
  }

  // file upload
  // console.log("File Upload", JSON.stringify(req.file));
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file?.path, {
        folder: "LMS Project",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // remove file from server
        fs.unlink(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(
        new AppError(error || "File not uploaded, Please try again", 500)
      );
    }
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
