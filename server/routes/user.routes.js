import express from "express";
import upload from "../middlewares/multer.middleware.js";
import { login, logout, register } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
