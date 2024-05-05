const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = new Schema(
  {
    name: { type: String, required: true },
    info: { type: String, required: true },
    major: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("companies", Company);
