const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const User = require("../models/User");

// post /api/users - create user
const createUserValidator = [
  check("username", "Minimum username length is 3 characters.").isLength({
    min: 6
  }),
  check("email", "Email is not correct.").isEmail(),
  check("password", "Minimum password length is 6 characters.").isLength({
    min: 6
  })
];
const create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Registration data is not correct."
      });
    }

    const { username, email, password } = req.body;
    // const userExists = await User.findOne({ $or: [{email}, {username}] }); //if username also unique
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hasedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hasedPassword });

    await user.save();
    return res.status(201).json({
      message: "Successfully signed up!"
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
};

// get /api/users - list of all users
const list = async (req, res) => {
  try {
    const users = await User.find().select(
      "username email updatedAt createdAt"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
};

/**
 * Load the user and append to req.
 */
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user)
      return res.status("400").json({
        message: "User not found"
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("500").json({
      message: "Could not retrieve user"
    });
  }
};

// read /api/users/:id - read user
const read = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};

// update /api/users/:id - update user
const updateUserValidator = [
  check("username", "Minimum username length is 3 characters.").isLength({
    min: 3
  }),
  check("email", "Email is not correct.").isEmail()
];
const update = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Registration data is not correct."
      });
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        res
          .status(400)
          .json({ message: "Minimum password length is 6 charachters" });
      }
      const hasedPassword = await bcrypt.hash(req.body.password, 12);
      req.body.password = hasedPassword;
    }
    let user = req.profile;
    user = _.extend(user, req.body);
    await user.save();
    user.password = undefined;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
};

// delete /api/users/:id - delete user
const remove = async (req, res, next) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.password = undefined;
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
};

module.exports = {
  create,
  createUserValidator,
  list,
  userByID,
  read,
  update,
  updateUserValidator,
  remove
};
