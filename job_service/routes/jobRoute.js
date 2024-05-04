import express from "express";
import {
  addJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../controllers/jobController.js";
import { body } from "express-validator";

const router = express.Router();

//add job
router.post(
  "",
  body("position")
    .isString()
    .withMessage("Please, enter valid position")
    .isLength({ min: 4, max: 25 })
    .withMessage("Please, enter job position in range 4 to 25 chars"),
  body("description")
    .isString()
    .withMessage("Please, enter valid description")
    .isLength({ min: 4, max: 25 })
    .withMessage("Please, enter job description in range 4 to 25 chars"),
  body("qualification")
    .isString()
    .withMessage("Please, enter valid qualification")
    .isLength({ min: 4, max: 25 })
    .withMessage("Please, enter job qualification in range 4 to 25 chars"),
  body("image_url")
    .isString()
    .withMessage("Please, enter valid image url")
    .isLength({ min: 4 })
    .withMessage("Please, enter job image url with min 4 chars"),
  body("offer")
    .isString()
    .withMessage("Please, enter valid offer")
    .isNumeric()
    .withMessage("Please, enter numeric number for offer"),
  body("max_candidate_number")
    .isString()
    .withMessage("Please, enter valid max_candidate_number")
    .isNumeric()
    .withMessage("Please, enter numeric number for max_candidate_number"),
  addJob
);

//update job
router.put(
  "/:id",
  body("position")
    .isString()
    .withMessage("Please, enter valid position")
    .isLength({ min: 4, max: 25 })
    .withMessage("Please, enter job position in range 4 to 25 chars"),
  body("description")
    .isString()
    .withMessage("Please, enter valid description")
    .isLength({ min: 4, max: 25 })
    .withMessage("Please, enter job description in range 4 to 25 chars"),
  body("description")
    .isString()
    .withMessage("Please, enter valid qualification")
    .isLength({ min: 4, max: 25 })
    .withMessage("Please, enter job qualification in range 4 to 25 chars"),
  body("image_url")
    .isString()
    .withMessage("Please, enter valid image url")
    .isLength({ min: 4 })
    .withMessage("Please, enter job image url with min 4 chars"),
  body("offer")
    .isString()
    .withMessage("Please, enter valid offer")
    .isNumeric()
    .withMessage("Please, enter numeric number for offer"),
  body("max_candidate_number")
    .isString()
    .withMessage("Please, enter valid max_candidate_number")
    .isNumeric()
    .withMessage("Please, enter numeric number for max_candidate_number"),
  updateJob
);

//delete job
router.delete("/:id", deleteJob);

//get a job
router.get("/:id", getJob);

//get all jobs
router.get("", getAllJobs);

export default router;