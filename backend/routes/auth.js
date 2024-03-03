const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

// Create a User using POST => "/api/auth/". Does not require authorization.
router.post(
  "/",
  [
    body("name").notEmpty().isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").notEmpty().isLength({ min: 8 }),
    body("country").notEmpty(),
    body("city").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ message: err.message });
      });
  }
);

module.exports = router;
