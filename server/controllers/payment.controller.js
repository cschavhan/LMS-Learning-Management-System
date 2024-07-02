import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import razorpay from "../src/server.js";
import AppError from "../utils/error.utils.js";

export const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay Api key",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// buy subscription
export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      next(new AppError("Unauthorized, please login", 400));
    }

    if (user.role === "ADMIN") {
      next(new AppError("Admin cannot purchase a sunscription", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Subscribed Successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// verify subscription
export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    const user = await User.findById(id);
    if (!user) {
      next(new AppError("Unauthorized, please login", 400));
    }

    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified, please try again", 500));
    }

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";
    await user.save();
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// cancel subscription
export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized,please login", 400));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("You can not cancel the subscription", 400));
    }

    const subscribeId = user.subscription.id;

    const subscription = await razorpay.subscriptions.cancel(subscribeId);

    user.subscription.status = subscription.status || "inactive";

    await user.save();
    res.status(200).json({
      success: true,
      message: "Subscription cancle successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//all payments
export const allPayments = async (req, res, next) => {
  try {
    const { count } = req.query;

    const subscription = await razorpay.subscriptions.all({
      count: count || 10,
    });

    // Fetch all payment records from the database
    const payments = await Payment.find().limit(count || 10);

    // Initialize finalMonths and monthlySalesRecord
    const finalMonths = {};

    const monthlySalesRecord = new Array(12).fill(0);

    // Aggregate data from payment records
    payments.forEach((payment) => {
      // Aggregate finalMonths based on createdAt
      const createdAt = new Date(payment.createdAt);
      const monthName = createdAt.toLocaleString("default", { month: "long" });

      if (!finalMonths[monthName]) {
        finalMonths[monthName] = 0;
      }
      finalMonths[monthName] += 1;

      // Aggregate monthlySalesRecord
      payment.monthlySalesRecord.forEach((record, index) => {
        if (monthlySalesRecord[index] === undefined) {
          monthlySalesRecord[index] = 0;
        }
        monthlySalesRecord[index] += record;
      });
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      subscription,
      finalMonths,
      monthlySalesRecord,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
