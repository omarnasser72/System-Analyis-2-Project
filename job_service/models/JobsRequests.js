import mongoose from "mongoose";

const jobRequsetsSchema = mongoose.Schema({
  job_id: {
    type: String,
    require: true,
  },
  user_id: {
    type: String,
    require: true,
  },
  acceptance: {
    type: Number,
  },
});

export default mongoose.model("job requests", jobRequsetsSchema);
