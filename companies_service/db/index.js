const mongoose = require("mongoose");

mongoose
  .connect("mongodb://companies_db:27017/companydb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
