import express from "express";
import morgan from "morgan";
import userRoutes from "../routes/user.routes.js";
import { config } from "dotenv";
config();
const app = express();

// middleware
app.use(morgan("dev"));

// route
app.use("/api/user", userRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 page not found");
});
export default app;
