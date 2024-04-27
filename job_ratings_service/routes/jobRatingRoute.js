import Express from "express";
import {
  addJobRating,
  getJobRating,
} from "../controllers/jobRatingController.js";

const router = Express.Router();

//Add or Update Job Rating
router.post("/add", addJobRating);

//Get Job Rating
router.get("/:id", getJobRating);

export default router;
