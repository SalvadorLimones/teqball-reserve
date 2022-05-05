const EventService = require("../service/event");

const apiRegister = async (req, res, next) => {
  if (!req.body.group_id || !req.body.name || !req.body.venue || !req.body.date)
    return res.sendStatus(401);

  if (req.body.name.length < 5) return res.sendStatus(403);
  if (req.body.venue.length < 5) return res.sendStatus(403);
  if (isNaN(Date.parse(req.body.date))) return res.sendStatus(403);

  try {
    const event = await EventService.saveEvent(req.body);
    if (event) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
  }
};

const apiEventList = async (req, res, next) => {
  if (!req.body.group_id) return res.sendStatus(401);
  try {
    const eventList = await EventService.eventList(req.body.group_id);
    res.send(eventList);
  } catch (error) {
    console.log(error);
  }
};

const apiConnectToEvent = async (req, res, next) => {
  if (!req.body.event_id) return res.sendStatus(401);
  console.log(req.user_id);
  console.log("USERNAME:", req.username);
  try {
    const event = await EventService.connectToEvent(
      req.body.event_id,
      req.user_id,
      req.username
    );
    if (event) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
  }
};

const apiDisconnectFromEvent = async (req, res, next) => {
  if (!req.body.event_id) return res.sendStatus(401);

  try {
    const event = await EventService.disconnectFromEvent(
      req.body.event_id,
      req.user_id
    );
    if (event) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  apiRegister,
  apiEventList,
  apiConnectToEvent,
  apiDisconnectFromEvent,
};
