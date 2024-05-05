const mongoose = require("mongoose");

mongoose
  .connect("mongodb://contactus_db:27017/contactdb", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to contact us db");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
