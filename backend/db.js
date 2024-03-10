const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.DB_STRING;

const connectToMongoDB = () => {
  mongoose.connect(mongoURI);
};

module.exports = connectToMongoDB;
