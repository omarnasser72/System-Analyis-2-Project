import express from "express";
import { body } from "express-validator";
import {
  addJobRequest,
  deleteJobRequest,
  getAllJobRequests,
  getJobRequest,
  updateJobRequest,
} from "../controllers/jobRequestController.js";

const router = express.Router();

//add job request
router.post(
  "",
  body("user_id").isString().withMessage("Please, enter valid user_id"),
  body("job_id").isString().withMessage("Please, enter valid job_id"),
  addJobRequest
);

//update job
router.put(
  "/:id",
  body("user_id").isString().withMessage("Please, enter valid user_id"),
  body("job_id").isString().withMessage("Please, enter valid job_id"),
  body("acceptance")
    .isString()
    .withMessage("Please, enter valid job_id")
    .isBoolean()
    .withMessage("Please, enter boolean value for acceptance"),
  updateJobRequest
);

//delete job request
router.delete("/:id", deleteJobRequest);

//get a job request
router.get("/:id", getJobRequest);

//get all job requests
router.get("", getAllJobRequests);

export default router;
