import express from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  changePassword,
  forgotPassword,
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  update,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLoggedIn, getProfile);
router.put("/update", isLoggedIn, upload.single("avatar"), update);
router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);

export default router;
