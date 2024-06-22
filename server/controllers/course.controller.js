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
