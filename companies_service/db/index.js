const mongoose = require("mongoose");

mongoose
  .connect("mongodb://companies_db:27017/campanydb", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to companies db");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
