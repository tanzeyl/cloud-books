require("dotenv").config();
const connectToMongoDB = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongoDB();

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`CloudBooks Backend listening on port http://localhost:${port}`);
});
