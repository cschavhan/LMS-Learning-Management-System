import express from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  getProfile,
  login,
  logout,
  register,
  update,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLoggedIn, getProfile);
router.put("/update", isLoggedIn, upload.single("avatar"), update);

export default router;
