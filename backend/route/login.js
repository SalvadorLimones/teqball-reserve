const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ username });

    if (
      user &&
      user.confirmed &&
      (await bcrypt.compare(password, user.password))
    ) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: 60 * 60,
        }
      );

      return res.send(token);
    }
    res.status(401).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
