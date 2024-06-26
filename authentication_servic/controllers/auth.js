const jwt = require("jsonwebtoken");
//const bcrypt = require('bcrypt');
const User = require("../models/User");

// Register a new user
const register = async (req, res, next) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).json({ message: "Email already exists" });
    const user = new User({ ...req.body, type: 0 });
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email or Password is Incorrect" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email or Password is Incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    user.token = token;
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
