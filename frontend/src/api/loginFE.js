const axios = require("axios");

export const sendLogin = async (username, password) => {
  const resp = await axios
    .post("http://localhost:5000/api/login", {
      username: username,
      password: password,
    })
    .catch((error) => {
      if (error.response.status === 400) {
        window.alert("all fields required!");
      }
      if (error.response.status === 401) {
        window.alert("wrong username or password!");
      }
    });
  return resp.data;
};
