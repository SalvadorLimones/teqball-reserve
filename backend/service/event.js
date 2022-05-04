const Group = require("../model/group");
// require("../controller/functions");

const findGroupById = async (id) => {
  try {
    const existingGroup = await Group.findById(id);
    return existingGroup;
  } catch (error) {
    console.log(`Could not find group ${error}`)
  }
}

const saveEvent = async (eventdata) => {
  const { name, venue, date } = eventdata;
  console.log(name, venue, date);
  try {
    const event = await Group.findByIdAndUpdate(eventdata.group_id, 
      { $push: {
        events: {
          name: name,
          venue: venue,
          date: date
        }
      }});
    return event;
  } catch (error) {
    console.log(`Could not save event ${error}`)
  }
  return true;
}

module.exports = { findGroupById, saveEvent }