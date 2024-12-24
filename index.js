import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import userRoute from "./routes/userRoute.js";
import homeRoute from "./routes/homeRoute.js";

dotenv.config();

connectDB();

const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
};

const app = express();
app.use(express.json());
app.use(errorHandler);

// apis
app.use("/", homeRoute);
app.use("/api", userRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
