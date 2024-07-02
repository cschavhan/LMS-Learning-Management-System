import express from "express";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  addLecturesToCourseById,
  createCourses,
  deleteCourse,
  getAllCourses,
  getLecturesByCourseId,
  removeLectureByCourseId,
  updateCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post(
  "/",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("thumbnail"),
  createCourses
);
router.get("/", getAllCourses);
router.put(
  "/:id",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("thumbnail"),
  updateCourse
);
router.delete("/:id", isLoggedIn, authorizedRoles("ADMIN"), deleteCourse);

// lectures
router.get("/:id", isLoggedIn, authorizedRoles, getLecturesByCourseId);
router.post(
  "/:id",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("lectureThumbnail"),
  addLecturesToCourseById
);
router.delete(
  "/:courseId/:lectureId",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  removeLectureByCourseId
);

export default router;
