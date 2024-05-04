import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  position: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  offer: {
    type: Number,
    require: true,
  },
  max_candidate_number: {
    type: Number,
    require: true,
  },
  qualification: {
    type: String,
    require: true,
  },
  image_url: {
    type: String,
    require: true,
  },
});

export default mongoose.model("jobs", jobSchema);