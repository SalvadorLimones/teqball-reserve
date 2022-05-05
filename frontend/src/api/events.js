const axios = require("axios");

export const listEvents = async (userId, groupId, eventId) => {
  const token = localStorage.getItem("token");
  if (!token) window.alert("Please log in first");
  if (token && userId && groupId && eventId) {
    const requestBody = {
      token: token,
      groupId: groupId,
      userId: userId,
      eventId: eventId,
    };

    try {
      const response = await axios.get("http://localhost:5000/api/event/list", {
        requestBody,
      });
      return response;
    } catch (error) {
      console.log("something has gone wrong! ", error);
      return error;
    }
  }
};

export const addEvent = async (group_id, name, venue, date) => {
  const token = localStorage.getItem("token");
  if (!token) window.alert("Please log in first");
  if ((token && group_id && name && venue, date)) {
    try {
      const response = await axios.get("http://localhost:5000/api/event/list", {
        token: token,
        group_id: group_id,
        name: name,
        venue: venue,
        date: date,
      });
      return response;
    } catch (error) {
      console.log("something has gone wrong! ", error);
      return error;
    }
  }
};
