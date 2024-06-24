import Course from "../models/course.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import AppError from "../utils/error.utils.js";
import cloudinary from "cloudinary";

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

// update course
export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All fields are required", 400));
    }

    const thumbnailLocalPath = req.file?.path;
    if (!thumbnailLocalPath) {
      return next(new AppError("thumbnail file is missing", 400));
    }

    //delete the old file
    if (req.params?.thumbnail) {
      await cloudinary.v2.uploader.destroy(req.params?.thumbnail);
    }

    //update the new file
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnail || !thumbnail.url) {
      return next(new AppError("thumbnail file is required", 400));
    }

    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          category,
          createdBy,
          thumbnail: thumbnail.url,
        },
      },
      { new: true, runValidators: true }
    );

    if (!course) {
      return next(
        new AppError("Failed to update the course,please try again", 400)
      );
    }

    await course.save();
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// delete the course
export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//add lecture to course by id
export const addLecturesToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("course not exist with given id", 400));
    }

    const lectureThumbnailLocalPath = req.file?.path;
    if (!lectureThumbnailLocalPath) {
      return next(new AppError("lecture thumbnail file missing", 400));
    }

    const lectureThumbnail = await uploadOnCloudinary(
      lectureThumbnailLocalPath
    );
    if (!lectureThumbnail) {
      return next(new AppError("lecture thumbnail file is required", 400));
    }

    const lectureData = {
      title,
      description,
      lectureThumbnail: lectureThumbnail.url,
    };

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;

    await course.save();
    res.status(200).json({
      success: true,
      message: "Lecture added to course successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// delete lecture from the course
export const removeLectureByCourseId = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;
    console.log(`courseid is ${courseId} : lectureid is ${lectureId}`);

    if (!courseId || !lectureId) {
      return next(new AppError("courseId and lectureId are required", 400));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new AppError("course not found with the given id", 404));
    }

    const lectureIndex = course.lectures.findIndex((lecture) => {
      return lecture._id.toString() === lectureId;
    });

    if (lectureIndex === -1) {
      return next(new AppError("Lecture not found with the given ID", 404));
    }

    course.lectures.splice(lectureIndex, 1);
    course.numberOfLectures = course.lectures.length;

    await course.save();
    res.status(200).json({
      success: true,
      message: "Lecture deleted from course successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
