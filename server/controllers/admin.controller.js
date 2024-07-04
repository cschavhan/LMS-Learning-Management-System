import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";

export const getUserStats = async (req, res, next) => {
  try {
    const allUsersCount = await User.countDocuments();
    const subscribedCount = await User.countDocuments({
      "subscription.status": { $in: ["active", "subscribed"] },
    });

    res.status(200).json({
      success: true,
      message: "User count and user subscribed count fetched successfully",
      allUsersCount,
      subscribedCount,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
