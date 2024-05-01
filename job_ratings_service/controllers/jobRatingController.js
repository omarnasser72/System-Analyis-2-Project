import { validationResult } from "express-validator";
import JobRating from "../models/JobRating.js";
import UserJobRating from "../models/userJobRating.js";

export const addJobRating = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("req.body.userId: ", req.body.userId);
    console.log("req.body.jobId: ", req.body.jobId);

    const userJobRating = await UserJobRating.findOne({
      userId: req.body.userId,
      jobId: req.body.jobId,
    });
    console.log("ratingFound: ", userJobRating);
    if (userJobRating === null) {
      const newUserJobRating = new UserJobRating({ ...req.body });
      newUserJobRating.save();
      console.log("this the first time for this user to rate this job");

      const jobRating = await JobRating.findOne({ jobId: req.body.jobId });
      if (jobRating) {
        const allRates = await UserJobRating.find({ jobId: req.body.jobId });
        let totolRates = 0,
          len = 0;

        allRates.map((userJobRate) => {
          len = len + 1;
          totolRates = totolRates + parseInt(userJobRate.rating);
        });
        const avg = totolRates / len;
        const jobRate = parseInt((avg / 5) * 5);
        const updatedJobRate = await JobRating.findOneAndUpdate(
          {
            jobId: req.body.jobId,
          },
          {
            $set: {
              rating: jobRate,
            },
          },
          { new: true }
        );
        if (updatedJobRate) {
          console.log("Job rate has updated successfully and it's : ", jobRate);
          res.status(200).json({
            jobRate: jobRate,
          });
        } else {
          next(createError(400, `Job rate update failed`));
        }
      } else {
        const newJobRating = new JobRating({
          jobId: req.body.jobId,
          rating: req.body.rating % 5,
        });
        newJobRating.save();
        res.status(201).json({
          jobRate: newJobRating.rating,
        });
      }
    } else {
      const updatedUserJobRate = await UserJobRating.findOneAndUpdate(
        {
          userId: req.body.userId,
          jobId: req.body.jobId,
        },
        {
          $set: {
            rating: req.body.rating,
          },
        },
        {
          new: true,
        }
      );
      if (updatedUserJobRate) {
        const allRates = await UserJobRating.find({ jobId: req.body.jobId });
        let totolRates = 0,
          len = 0;
        allRates.map((userJobRate) => {
          len = len + 1;
          totolRates = totolRates + parseInt(userJobRate.rating);
        });
        const avg = totolRates / len;
        const jobRate = (avg / 5) * 5;

        console.log(
          "Rating exist and update successfully:",
          updatedUserJobRate
        );

        const updatedJobRate = await JobRating.findOneAndUpdate(
          {
            jobId: req.body.jobId,
          },
          {
            $set: {
              rating: jobRate,
            },
          },
          { new: true }
        );
        if (updatedJobRate) {
          console.log(
            `Job rate has updated successfully and it's : ${jobRate}`
          );
          res.status(200).json({
            jobRate: jobRate,
          });
        } else {
          next(createError(400, `Job rate update failed`));
        }
      } else console.log("Rating exist and update failed. ");
    }
  } catch (error) {
    next(error);
  }
};

export const getJobRating = async (req, res, next) => {
  try {
    const jobRating = await JobRating.findOne({ jobId: req.params.id });
    jobRating
      ? res.status(200).json({ jobRate: jobRating.rating })
      : res.status(200).json({ jobRate: 0 });
  } catch (error) {
    next(error);
  }
};

export const getAllJobRating = async (req, res, next) => {
  try {
    const jobRatings = await JobRating.find();
    res.status(200).json(jobRatings);
  } catch (error) {
    next(error);
  }
};

export const healthCheck = async (req, res, next) => {
  try {
    res.status(200).json("health check api");
  } catch (error) {
    next(error);
  }
};
