const router = require("express").Router();
const PrivatePublic = require("../model/private_public");

router.get("/", (req, res) => {
  PrivatePublic.find()
    .then((results) => {
      res.send(results[0].public);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
