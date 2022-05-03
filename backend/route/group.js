const router = require("express").Router();

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (!(name && description)) return res.send(400);

  res.send(res);
});
