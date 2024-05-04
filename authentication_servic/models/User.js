const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  type: {
    type: Boolean,
    require: true,
  },
  skill: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  aboutYou: {
    type: String,
    require: true,
  },
});

// Compare the given password with the hashed password in the database
UserSchema.methods.comparePassword = async function (password) {
  return password == this.password;
};

const User = mongoose.model("users", UserSchema);

module.exports = User;
