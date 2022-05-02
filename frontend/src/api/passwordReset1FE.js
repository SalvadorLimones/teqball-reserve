const axios = require("axios");

export const sendUsername = async (username) => {
  try {
    await axios.post("http://localhost:5000/api/reset", {
      username: username,
    });
    return alert("Password reset email sent!");
  } catch (err) {
    console.log(err);
    if (!err.response) return alert("network error");

    if (err.response.status === 401) {
      return alert("Unauthorized");
    }
    return alert("Something went wrong");
  }
};
