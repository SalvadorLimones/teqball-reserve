const axios = require("axios");

export const registrationConfirm = async (code, username) => {
  try {
    const resp = await axios.post("http://localhost:5000/api/confirm", {
      code: code,
      username: username,
    });
    return resp.data;
  } catch (error) {
    return "code expired or incorrect";
  }
};
