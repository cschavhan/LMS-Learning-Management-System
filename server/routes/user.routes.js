import express from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLoggedIn, getProfile);

export default router;
