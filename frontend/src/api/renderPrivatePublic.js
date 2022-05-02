const axios = require("axios");

export const publicPage = async () => {
  return await axios.get("http://localhost:5000/api/public");
};
export const privatePage = async () => {
  const token = localStorage.getItem("token");
  return await axios.get("http://localhost:5000/api/private", {
    headers: { token: token },
  });
};
