const axios = require("axios");

export const sendGoogleAuth = async (code) => {
  let resp = await axios.post("http://localhost:5000/api/google-auth", {
    code: code,
  });
  return resp.data;
};
