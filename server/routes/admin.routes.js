import express from "express";
import { getUserStats } from "../controllers/admin.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/stats/user", isLoggedIn, authorizedRoles("ADMIN"), getUserStats);

export default router;
