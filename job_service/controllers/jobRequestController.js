import { validationResult } from "express-validator";
import JobRequest from "../models/JobsRequests.js";

export const addJobRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const jobRequestExist = await JobRequest.findOne({
      user_id: req.body.user_id,
      job_id: req.body.job_id,
    });
    if (jobRequestExist)
      return res.status(200).json("You've already applied to this job before.");

    const jobRequest = new JobRequest({ ...req.body, acceptance: 0 });
    const savedJobRequest = await jobRequest.save();

    res.status(201).json(savedJobRequest);
  } catch (error) {
    next(error);
  }
};

export const updateJobRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const jobRequest = await JobRequest.findById(req.params.id);

    if (!jobRequest)
      return res.status(400).json({ message: "job request doesn't exist!" });

    const updatedJobRequest = await JobRequest.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedJobRequest);
  } catch (error) {
    next(error);
  }
};

export const deleteJobRequest = async (req, res, next) => {
  try {
    const jobRequest = await JobRequest.findById(req.params.id);
    if (!jobRequest)
      return res.status(400).json({ message: "job request doesn't exist!" });

    await JobRequest.findByIdAndDelete(req.params.id);

    res.status(200).json("Job deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getJobRequest = async (req, res, next) => {
  try {
    const jobRequest = await JobRequest.findById(req.params.id);
    if (!jobRequest)
      return res.status(400).json({ message: "job request doesn't exist!" });

    res.status(200).json(jobRequest);
  } catch (error) {
    next(error);
  }
};

export const getAllJobRequests = async (req, res, next) => {
  try {
    const JobRequests = await JobRequest.find();
    res.status(200).json(JobRequests);
  } catch (error) {
    next(error);
  }
};