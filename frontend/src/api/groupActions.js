const axios = require("axios");

export const createGroup = async (name, description, setMessage) => {
  const token = localStorage.getItem("token");
  if (!token) console.log("please sign in first!");
  if (token) {
    const requestBody = { name: name, description: description, token: token };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/group/create",
        requestBody
      );
      setMessage("Group created successfully!");
      return response;
    } catch (error) {
      console.log("something has gone wrong creating this group! ", error);
      setMessage("Something has gone wrong!");
      return error;
    }
  }
};

export const joinGroup = async (groupId) => {
  const token = localStorage.getItem("token");
  if (!token) console.log("please sign in first!");
  if (token) {
    const requestBody = { token: token, groupId: groupId };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/group/join",
        requestBody
      );
      return response;
    } catch (error) {
      console.log("something has gone wrong joining this group! ", error);
      return error;
    }
  }
};

export const leaveGroup = async (groupId) => {
  const token = localStorage.getItem("token");
  if (!token) console.log("please sign in first!");
  if (token) {
    const requestBody = { token: token, groupId: groupId };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/group/leave",
        requestBody
      );
      return response;
    } catch (error) {
      console.log("something has gone wrong leaving this group! ", error);
      return error;
    }
  }
};

export const getMembers = async (groupId) => {
  const token = localStorage.getItem("token");
  if (!token) console.log("please sign in first!");
  if (token) {
    const requestBody = { token: token, groupId: groupId };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/group/users",
        requestBody
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("something has gone wrong fetching group members! ", error);
      return error;
    }
  }
};

export const acceptUser = async (groupId, userId) => {
  const token = localStorage.getItem("token");
  if (!token) console.log("please sign in first!");
  if (token) {
    const requestBody = { token: token, groupId: groupId, userId: userId };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/group/accept",
        requestBody
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("something has gone wrong accepting group member! ", error);
      return error;
    }
  }
};

export const refuseUser = async (groupId, userId) => {
  const token = localStorage.getItem("token");
  if (!token) console.log("please sign in first!");
  if (token) {
    const requestBody = { token: token, groupId: groupId, userId: userId };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/group/refuse",
        requestBody
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("something has gone wrong rejecting group member! ", error);
      return error;
    }
  }
};

export const changeStatus = async (groupId, userId, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) window.alert('Please sign in first!');
    if (token && groupId && userId) {
        const requestBody = { token: token, groupId: groupId, userId: userId, newStatus: newStatus };
        try { 
            const response = await axios.post("http://localhost:5000/api/group/change-status", requestBody);
            console.log(response.data);
            return response;
        } catch (error) {
            console.log("something has gone wrong showing group member's status! ", error);
            return error;
        }
    }
}
