import express from "express";
import {
  buySubscription,
  getRazorpayApiKey,
  verifySubscription,
} from "../controllers/payment.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/razorpay-key").get(isLoggedIn, getRazorpayApiKey);
router.route("/subscribe").post(isLoggedIn, buySubscription);
router.route("/verify").post(isLoggedIn, verifySubscription);

export default router;
