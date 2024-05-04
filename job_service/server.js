import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jobRoute from "./routes/jobRoute.js";
import jobRequestRoute from "./routes/jobRequestRoute.js";
//import jobRatingRoute from "./routes/jobRatingRoute.js";

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to job database");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/jobs", jobRoute);

app.use("/api/jobRequests", jobRequestRoute);

//health check
app.get("/healthCheck", (req, res, next) => {
  try {
    res.status(200).json("health check api from job service");
  } catch (error) {
    next(error);
  }
});
//app.use("/api/jobRating", jobRatingRoute);

//Error handling
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMsg =
    error.message || "something went error in job review service";
  return res.status(errorStatus).json({
    success: false,
    message: errorMsg,
  });
});

app.listen(process.env.PORT, async () => {
  await connect();
  console.log(`Job service is running on port ${process.env.PORT}`);
});
