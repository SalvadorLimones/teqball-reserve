const EventService = require("../service/event");

const  apiRegister = async (req, res, next) => {
   console.log(req.body);
   if (!req.body.group_id || !req.body.name || !req.body.venue || !req.body.date) return res.sendStatus(401);

   if (req.body.name.length < 5) return res.sendStatus(403);
   if (req.body.venue.length < 5) return res.sendStatus(403);
   if (isNaN(Date.parse(req.body.date))) return res.sendStatus(403);

   try {
      // const existingGroup = await EventService.findGroupById(req.body.group_id);
      // console.log(existingGroup);
      // if (!existingGroup) return res.sendStatus(403);
      const event = await EventService.saveEvent(req.body);
      if (event) {
         res.sendStatus(200);
      } else {
         res.sendStatus(400);
      }
   } catch (error) {
      console.log(error);
   }
}

module.exports = { apiRegister }