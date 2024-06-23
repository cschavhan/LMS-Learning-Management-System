import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  createCourses,
  getAllCourses,
  getLecturesByCourseId,
  updateCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", isLoggedIn, upload.single("thumbnail"), createCourses);
router.get("/", getAllCourses);
router.get("/:id", isLoggedIn, getLecturesByCourseId);
router.put("/:id", isLoggedIn, upload.single("thumbnail"), updateCourse);

export default router;
