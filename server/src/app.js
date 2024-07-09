import express from "express";
import morgan from "morgan";
import userRoutes from "../routes/user.routes.js";
import courseRoutes from "../routes/course.routes.js";
import paymentRoutes from "../routes/payment.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import contactRoutes from "../routes/contact.routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();
const app = express();

// middleware
//Built-in
app.use(express.json());

//Third-party
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// route
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/contact", contactRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 page not found");
});

app.use(errorMiddleware);
export default app;
