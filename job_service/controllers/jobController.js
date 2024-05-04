import { validationResult } from "express-validator";
import Job from "../models/Job.js";

export const addJob = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const job = new Job({ ...req.body });
    const savedJob = await job.save();

    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const job = await Job.findById(req.params.id);

    if (!job) return res.status(400).json({ message: "job id doesn't exist!" });

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(400).json({ message: "job doesn't exist!" });

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json("Job deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(400).json({ message: "job doesn't exist!" });

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};
