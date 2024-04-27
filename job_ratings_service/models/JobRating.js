import mongoose from "mongoose";

const JobRatingSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
});

export default mongoose.model("JobRating", JobRatingSchema);
