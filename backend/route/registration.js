const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendEmail,
  checkAlreadyRegistered,
  storeUserData,
} = require("../controller/functions");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username && email && password)) return res.send(400);

  const registered = await checkAlreadyRegistered(username, email);
  if (registered) return res.send(401);

  const hash = await bcrypt.hash(password, 10);
  const resp = await storeUserData(username, email, hash);
  const user = await User.findOne({ username: username });
  const token = jwt.sign({ user_id: user._id }, process.env.EMAIL_CODE, {
    expiresIn: 60 * 5,
  });

  sendEmail(token, user, "confirm").catch(console.error);
  res.send(resp);
});

router.post("/check", async (req, res) => {
  const { type, value } = req.body;

  if (type === "username") {
    const resp = await User.countDocuments({ username: value });
    res.send(resp.toString());
  } else {
    const resp = await User.countDocuments({ email: value });
    res.send(resp.toString());
  }
});

module.exports = router;
