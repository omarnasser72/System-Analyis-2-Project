import Express from "express";
import { body } from "express-validator";
import {
  addJobRating,
  getAllJobRating,
  getJobRating,
  healthCheck,
} from "../controllers/jobRatingController.js";

const router = Express.Router();

//Add or Update Job Rating
router.post(
  "/add",
  body("userId").isString().withMessage("Please, Enter valid userId"),
  body("jobId").isString().withMessage("Please, Enter valid jobId"),
  body("rating").isNumeric().withMessage("Please, Enter valid rating"),
  addJobRating
);

//Get Job Rating
router.get("/get/:id", getJobRating);

//Get All Job Rating
router.get("/getAll", getAllJobRating);

//Health Check
router.get("/healthCheck", healthCheck);

export default router;
