import Course from "../models/course.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import AppError from "../utils/error.utils.js";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");
    if (!courses) {
      return next(new AppError("Courses not found", 400));
    }

    res.status(200).json({
      success: true,
      message: "All courses fetch successfully",
      courses,
    });
  } catch (error) {
    return next(
      new AppError("Something error while fetching all courses", 500)
    );
  }
};

// get lecture by course id
export const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("Invalid course id", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// create courses
export const createCourses = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All fields are required", 400));
    }

    // thumbnail upload
    const thumbnailLocalPath = req.file?.path;
    if (!thumbnailLocalPath) {
      return next(new AppError("thumbnailLocalPath file is required", 400));
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnail) {
      return next(new AppError("thumbnail file is required", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: thumbnail.url,
    });

    if (!course) {
      return next(new AppError("Course creation failed,please try again", 400));
    }

    await course.save();
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    return next(new AppError("Course failed to create", 500));
  }
};
