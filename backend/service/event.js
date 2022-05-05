const Group = require("../model/group");

const findGroupById = async (id) => {
  try {
    const existingGroup = await Group.findById(id);
    return existingGroup;
  } catch (error) {
    console.log(`Could not find group ${error}`);
  }
};

const saveEvent = async (eventdata) => {
  const { name, venue, date } = eventdata;
  try {
    const event = await Group.findByIdAndUpdate(eventdata.group_id, {
      $push: {
        events: {
          name: name,
          venue: venue,
          date: date,
        },
      },
    });
    return event;
  } catch (error) {
    console.log(`Could not save event ${error}`);
  }
};

const eventList = async (group_id) => {
  try {
    const group = await Group.findById(group_id);
    return group.events;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const connectToEvent = async (event_id, user_id, username) => {
  console.log(user_id);
  try {
    const updated = await Group.findOneAndUpdate(
      {
        "events._id": { _id: event_id },
      },
      {
        $push: {
          "events.$[a].participants": { id: user_id, name: username },
        },
      },
      {
        new: true,
        arrayFilters: [{ "a._id": event_id }],
      }
    );
    return updated;
  } catch (error) {
    console.log(`Could not save connect to event ${error}`);
  }
};

const disconnectFromEvent = async (event_id, user_id) => {
  console.log(user_id);
  try {
    const updated = await Group.findOneAndUpdate(
      {
        "events._id": { _id: event_id },
      },
      {
        $pull: {
          "events.$[].participants": { id: user_id },
        },
      },
      {
        new: true,
      }
    );
    return updated;
  } catch (error) {
    console.log(`Could not save disconnect to event ${error}`);
  }
};

module.exports = {
  findGroupById,
  saveEvent,
  eventList,
  connectToEvent,
  disconnectFromEvent,
};
