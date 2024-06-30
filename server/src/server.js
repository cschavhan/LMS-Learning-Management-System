import app from "./app.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import connectionToDb from "../config/db.connection.js";
const PORT = process.env.PORT || 4000;

// cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
export default razorpay;

app.listen(PORT, async () => {
  await connectionToDb();
  console.log(`Server is listening on http://localhost:${PORT}`);
});
