import AppError from "../utils/error.utils.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 401));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;
  next();
};

export const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRoles = req.user.role;
    if (!roles.includes(currentUserRoles)) {
      return next(
        new AppError("You do not have permission to access this route", 403)
      );
    }
    next();
  };

export const authorizedSubscriber = async (req, res, next) => {
  const subscription = req.user.subscription;
  const currentUserRoles = req.user.role;

  if (currentUserRoles !== "ADMIN" && subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route", 403));
  }
  next();
};
