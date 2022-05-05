const axios = require("axios");

export const listEvents = async (group_id) => {
  console.log("GROUPID:", group_id);
  const token = localStorage.getItem("token");
  if (!token) window.alert("Please log in first");
  if (token && group_id) {
    const requestBody = {
      token: token,
      group_id: group_id,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/event/list",

        requestBody
      );
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
      const response = await axios.post(
        "http://localhost:5000/api/event/register",
        {
          token: token,
          group_id: group_id,
          name: name,
          venue: venue,
          date: date,
        }
      );
      return response;
    } catch (error) {
      console.log("something has gone wrong! ", error);
      return error;
    }
  }
};
