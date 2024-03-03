const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let object = {
    name: "Tanzeel",
    age: 23,
  };
  res.json(object);
});

module.exports = router;
