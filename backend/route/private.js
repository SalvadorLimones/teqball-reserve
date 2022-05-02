const router = require("express").Router();
const PrivatePublic = require("../model/private_public");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  if (!(req.headers && req.headers.token)) return res.sendStatus(401);
  const token = req.headers.token;
  try {
    jwt.verify(token, process.env.TOKEN_KEY);

    PrivatePublic.find()
      .then((results) => {
        res.send(results[0].private);
      })
      .catch((error) => console.error(error));
  } catch (err) {
    res.sendStatus(401);
  }
});

module.exports = router;
