import mongoose from "mongoose";

const UserJobRatingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
});

export default mongoose.model("UserJobRating", UserJobRatingSchema);
