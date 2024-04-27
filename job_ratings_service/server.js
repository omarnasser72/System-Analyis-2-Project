import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jobRatingRoute from "./routes/jobRatingRoute.js";

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
    console.log("connected to ratings database");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/jobRating", jobRatingRoute);

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
  console.log(`Job rating service is running on port ${process.env.PORT}`);
});
