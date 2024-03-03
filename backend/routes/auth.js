const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_STRING = "secureJSONToken";

// Create a User using POST => "/api/auth/createUser". Does not require log in.
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
      res.status(500).send("Some error occured.");
    }
  }
);

// Log-in User using POST => "/api/auth/login". Requires log-in
// router.post(
//   "/login",
//   [body("email").notEmpty().isEmail(), body("password").notEmpty()],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const securePassword = await bcrypt.hash(req.body.password, salt);
//     try {
//       let user = await User.findOne({ email: req.body.email });
//       if (!user) {
//         return res
//           .status(400)
//           .json({ message: "This email does not exist. Kindly sign-up!" });
//       }
//       if (user.password === securePassword) {
//         return res.send(`${req.body.email} has been logged in.`);
//       } else {
//         return res.send(`Password incorrect.`);
//       }
//     } catch (err) {
//       res.status(500).send("Some error occured.");
//     }
//   }
// );

module.exports = router;
