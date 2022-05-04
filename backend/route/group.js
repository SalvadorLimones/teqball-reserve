const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Group = require("../model/group");
const {
  storeGroupData,
  getGrouplist,
  addNewMember,
  removeMember,
  checkEligible,
  acceptOrRefuse,
  getMembersList,
} = require("../controller/functions");

//Create a new group:
router.post("/create", async (req, res) => {
  const { name, description, token } = req.body;
  if (!(name && description, token)) return res.sendStatus(400);
  console.log("NAME: ", name);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const group = await Group.find({ name: req.body.name });
    console.log("GOROUP LENGTH:", group);
    if (group.length > 0)
      return res.status(409).send("group name already taken");

    const status = await storeGroupData(decoded, name, description);
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
    const status = await addNewMember(decoded, groupId);
    res.sendStatus(status);
  } catch (err) {
    res.sendStatus(err);
  }
});

//Leave a group:
router.post("/leave", async (req, res) => {
  const { token, groupId } = req.body;
  if (!(token && groupId)) return res.sendStatus(400);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const status = await removeMember(decoded, groupId);
    res.sendStatus(status);
  } catch (err) {
    res.sendStatus(err);
  }
});

//Accept join request:
router.post("/accept", async (req, res) => {
  const { token, groupId, userId } = req.body;
  if (!(token && groupId && userId)) return res.sendStatus(400);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const isEligible = await checkEligible(decoded, groupId, "accept");
    if (!isEligible) return res.sendStatus(401);

    const userAccepted = await acceptOrRefuse(groupId, userId, "accept");
    return userAccepted ? res.sendStatus(200) : res.sendStatus(500);
  } catch (err) {
    res.sendStatus(err);
  }
});

//Refuse join request:
router.post("/refuse", async (req, res) => {
  const { token, groupId, userId } = req.body;
  if (!(token && groupId && userId)) return res.sendStatus(400);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const isEligible = await checkEligible(decoded, groupId, "refuse");
    if (!isEligible) return res.sendStatus(401);

    const userRefused = await acceptOrRefuse(groupId, userId, "refuse");
    return userRefused ? res.sendStatus(200) : res.sendStatus(500);
  } catch (err) {
    res.sendStatus(err);
  }
});

//Get list of members of a given group:
router.post("/users", async (req, res) => {
  const { token, groupId } = req.body;
  if (!(token && groupId)) return res.sendStatus(400);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const isEligible = await checkEligible(decoded, groupId, "users");
    if (!isEligible) return res.sendStatus(401);
    const membersList = await getMembersList(groupId);
    return res.send(membersList.members);
  } catch (err) {
    res.sendStatus(err);
  }
});

//Get list of all groups and user's status information/group:
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
