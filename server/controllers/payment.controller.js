export const getRazorpayApiKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Razorpay Api key",
    key: process.env.RAZORPAY_KEY_ID,
  });
};
