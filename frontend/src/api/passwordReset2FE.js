const axios = require("axios");

export const sendPasswordreset = async (code, username, password) => {
  try {
    await axios.post("http://localhost:5000/api/password", {
      code: code,
      username: username,
      password: password,
    });
    return alert("Password successfully updated!");
  } catch (err) {
    console.log(err);
    if (!err.response) return alert("network error");

    if (err.response.status === 401) {
      return alert("Unauthorized");
    }
    return alert("Something went wrong");
  }
};
