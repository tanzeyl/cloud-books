const jwt = require("jsonwebtoken");
const JWT_STRING = "secureJSONToken";

const fetchuser = (req, res, next) => {
  // Get User details and append id to request.
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .json({ error: "Please authenticate using valid credentials." });
  }
  try {
    const data = jwt.verify(token, JWT_STRING);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Please authenticate using valid credentials." });
  }
};

module.exports = fetchuser;
