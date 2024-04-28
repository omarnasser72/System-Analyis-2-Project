import Express from "express";
import {
  addJobRating,
  getAllJobRating,
  getJobRating,
  healthCheck,
} from "../controllers/jobRatingController.js";

const router = Express.Router();

//Add or Update Job Rating
router.post("/add", addJobRating);

//Get Job Rating
router.get("/get/:id", getJobRating);

//Get All Job Rating
router.get("/getAll", getAllJobRating);

//Health Check
router.get("/healthCheck", healthCheck);

export default router;
