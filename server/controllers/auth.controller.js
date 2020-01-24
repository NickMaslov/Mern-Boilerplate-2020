const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// post /api/auth/signin - signin user
const signinValidator = [
  check("email", "Enter correct email")
    .normalizeEmail()
    .isEmail(),
  check("password", "Enter password").exists()
];
const signin = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Login data is not correct."
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password is not corect. Try again."
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ token, userId: user.id });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
};

// post /api/auth/logout - signout user
const logout = (req, res) => {
  //cleaning token on front side
  // res.clearCookie();
  // res.localStorage.clear();
  return res.status("200").json({
    message: "Logged out."
  });
};

const hasAuthorization = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // "Bearer TOKEN"
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No authorization." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({ message: "No authorization." });
  }
};

module.exports = { signin, signinValidator, logout, hasAuthorization };
