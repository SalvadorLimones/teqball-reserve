const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { confirmUser } = require("../controller/functions");

router.post("/", (req, res) => {
  const { code, username } = req.body;

  try {
    const decoded = jwt.verify(code, process.env.EMAIL_CODE);
    confirmUser(username);
    res.send(decoded);
  } catch (err) {
    console.log(err);
    res.send(400);
  }
});

module.exports = router;
