const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  let token = req.headers["token"];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = {verifyToken};