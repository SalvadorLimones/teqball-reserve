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
  verifyToken,
} = require("../controller/functions");

//Create a new group:
router.post("/create", async (req, res) => {
  const { name, description, token } = req.body;
  if (!(name && description, token)) return res.sendStatus(400);

  const user = await verifyToken(token);
  if (!user) return res.sendStatus(401);

  const group = await Group.find({ name: req.body.name });
  if (group.length > 0) return res.status(409).send("group name already taken");

  const status = await storeGroupData(user, name, description);
  res.sendStatus(status);
});

//Join an existing group:
router.post("/join", async (req, res) => {
  const { token, groupId } = req.body;
  if (!(token && groupId)) return res.sendStatus(400);

  const user = await verifyToken(token);
  if (!user) return res.sendStatus(401);

  const status = await addNewMember(user, groupId);
  res.sendStatus(status);
});

//Leave a group:
router.post("/leave", async (req, res) => {
  const { token, groupId } = req.body;
  if (!(token && groupId)) return res.sendStatus(400);

  const user = await verifyToken(token);
  if (!user) return res.sendStatus(401);

  const status = await removeMember(user, groupId);
  res.sendStatus(status);
});

//Accept join request:
router.post("/accept", async (req, res) => {
  const { token, groupId, userId } = req.body;
  if (!(token && groupId && userId)) return res.sendStatus(400);

  const user = await verifyToken(token);
  if (!user) return res.sendStatus(401);

  const isEligible = await checkEligible(user, groupId, "accept");
  if (!isEligible) return res.sendStatus(401);

  const userAccepted = await acceptOrRefuse(groupId, userId, "accept");
  return userAccepted ? res.sendStatus(200) : res.sendStatus(500);
});

//Refuse join request:
router.post("/refuse", async (req, res) => {
  const { token, groupId, userId } = req.body;
  if (!(token && groupId && userId)) return res.sendStatus(400);

  const user = await verifyToken(token);
  if (!user) return res.sendStatus(401);

  const isEligible = await checkEligible(user, groupId, "refuse");
  if (!isEligible) return res.sendStatus(401);

  const userRefused = await acceptOrRefuse(groupId, userId, "refuse");
  return userRefused ? res.sendStatus(200) : res.sendStatus(500);
});

//Get list of members of a given group:
router.post("/users", async (req, res) => {
  const { token, groupId } = req.body;
  if (!(token && groupId)) return res.sendStatus(400);

  const user = await verifyToken(token);
  if (!user) return res.sendStatus(401);

  const isEligible = await checkEligible(user, groupId, "users");
  if (!isEligible) return res.sendStatus(401);

  const membersList = await Group.findOne({ _id: groupId }).select("members");
  return res.send(membersList.members);
});

//Change status of a group member:
router.post("/change-status", async (req, res) => {
  const { token, groupId, userId, newStatus } = req.body;
  if (!(token && groupId && userId && newStatus)) return res.sendStatus(400);

  const user = await verifyToken(token);
  if (!user) return res.sendStatus(401);

  const isEligible = await checkEligible(user, groupId, "change", newStatus);
  if (!isEligible) return res.sendStatus(401);

  const statusChanged = await acceptOrRefuse(
    groupId,
    userId,
    "change",
    newStatus
  );
  return statusChanged ? res.sendStatus(200) : res.sendStatus(400);
});

//Get list of all groups and user's status information/group:
router.get("/list", async (req, res) => {
  const { token } = req.headers;
  if (!token) return res.sendStatus(400);

  const user = await verifyToken(token);
  if (!user) return res.sendStatus(401);

  const groupList = await getGrouplist(user.user_id);
  res.send(groupList);
});

module.exports = router;
