const mongoose = require("mongoose");
const mongoURI = `mongodb://localhost:27017/cloud-books?readPreference=primary&appname=MongoDV%20Compass&directConnection=true&ssl=false`;
const connectToMongoDB = () => {
  mongoose.connect(mongoURI);
};

module.exports = connectToMongoDB;
