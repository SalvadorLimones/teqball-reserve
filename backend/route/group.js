const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Group = require("../model/group");
const {
  storeGroupData,
  getGrouplist,
  addNewMember,
} = require("../controller/functions");

//Create a new group:
router.post("/create", async (req, res) => {
  const { name, description, token } = req.body;
  if (!(name && description, token)) return res.sendStatus(400);
  console.log("NAME: ", name);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const id = decoded.user_id;
    const group = await Group.find({ name: req.body.name });
    console.log("GOROUP LENGTH:", group);
    if (group.length > 0)
      return res.status(409).send("group name already taken");

    const status = await storeGroupData(id, name, description);
    res.sendStatus(status);
  } catch (err) {
    res.sendStatus(err);
  }
});

//Join an existing group:
router.post("/join", async (req, res) => {
  const { token, groupId } = req.body;
  if (!(token && groupId)) return res.sendStatus(400);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const status = await addNewMember(decoded.user_id, groupId);
    res.sendStatus(status);
  } catch (err) {
    res.sendStatus(err);
  }
});

//Get list of all groups and users status information/group:
router.get("/list", async (req, res) => {
  const { token } = req.headers;
  if (!token) return res.sendStatus(400);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const id = decoded.user_id;
    const groupList = await getGrouplist(id);
    res.send(groupList);
  } catch (err) {
    res.sendStatus(err);
  }
});

module.exports = router;
