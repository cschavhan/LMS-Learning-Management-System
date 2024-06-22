import Course from "../models/course.model.js";
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
