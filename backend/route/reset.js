const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Reset = require("../model/reset");
const User = require("../model/user");
const { sendEmail } = require("../controller/functions");

router.post("/", async (req, res) => {
  const { username } = req.body;

  if (!username) return res.sendStatus(401);
  const user = await User.findOne({ username });
  if (!user) return res.sendStatus(401);

  res.send("OK");

  const token = jwt.sign({ user_id: user._id }, process.env.EMAIL_RESET_CODE, {
    expiresIn: 60 * 5,
  });

  Reset.create({
    code: token,
  });

  sendEmail(token, user, "password").catch(console.error);
});

module.exports = router;
