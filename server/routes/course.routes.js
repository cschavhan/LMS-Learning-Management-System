import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {
  getAllCourses,
  getLecturesByCourseId,
} from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", isLoggedIn, getLecturesByCourseId);

export default router;
