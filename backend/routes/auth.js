const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/Users");
const fetchuser = require("../middleware/fetchUser");
const JWT_STRING = "secureJSONToken";
const router = express.Router();

// ROUTE 1: Create a User using POST => "/api/auth/createUser". Does not require log in.
router.post(
  "/createUser",
  [
    body("name").notEmpty().isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").notEmpty().isLength({ min: 8 }),
    body("country").notEmpty(),
    body("city").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    // Check if the email already exists.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "A user with this email exists already! Kindly log-in.",
        });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_STRING);
      res.json({ authtoken });
    } catch (err) {
      res.status(500).send("Internal server error.");
    }
  }
);

// ROUTE 2: Authenticate a User using POST => "/api/auth/login". No log-in required
router.post(
  "/login",
  [
    body("email", "Please enter a valid email.").notEmpty().isEmail(),
    body("password", "Password cannot be blank.").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Please try again with correct credentials." });
      }
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return res
          .status(400)
          .json({ message: "Please try again with correct credentials." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_STRING);
      res.json({ authtoken });
    } catch (err) {
      res.status(500).send("Internal server error.");
    }
  }
);

// ROUTE 3: Get logged-in User details using POST. Requires log-in.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
