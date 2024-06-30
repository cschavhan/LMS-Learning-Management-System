import express from "express";
import { getRazorpayApiKey } from "../controllers/payment.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/razorpay-key").get(isLoggedIn, getRazorpayApiKey);

export default router;
