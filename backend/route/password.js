const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../model/user");
const Reset = require("../model/reset");

router.post("/", async (req, res) => {
  const { code, username, password } = req.body;

  if (!(code && username && password)) return res.sendStatus(401);

  const reset = await Reset.findOne({ code });
  if (!reset) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(code, process.env.EMAIL_RESET_CODE);
    const id = decoded.user_id;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.findById(id);

    user.password = hash;
    user.save();
    res.send("OK");
  } catch (err) {
    res.sendStatus(401);
  }
});

module.exports = router;
