// const Event = require("../model/Group");
require("../controller/functions");

const findGroupById = async (id) => {
  try {
    console.log(id);
    const existingGroup = await Group.findById(option);
    return existingGroup;
  } catch (error) {
    console.log(`Could not find group ${error}`)
  }
}

const saveEvent = async (eventdata) => {
  try {
    // const event = new Group(groupdata);
    // const newGroup = await group.save();  
    // return newGroup;
    console.log(eventData);
  } catch (error) {
    console.log(`Could not save event ${error}`)
  }
}

module.exports = { findGroupById, saveEvent }