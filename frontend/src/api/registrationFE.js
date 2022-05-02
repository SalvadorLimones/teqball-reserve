const axios = require("axios");

export const sendRegistration = async (username, email, password) => {
  const resp = await axios
    .post("http://localhost:5000/api/registration", {
      username: username,
      email: email,
      password: password,
    })
    .catch((error) => {
      if (error.response.status === 400) {
        window.alert("all fileds required!");
      }
      if (error.response.status === 401) {
        window.alert("username or email already taken!");
      }
    });
  return resp.data;
};

export const checkUserOrEmail = async (type, value) => {
  console.log("checking");
  const resp = await axios.post(
    "http://localhost:5000/api/registration/check",
    {
      type: type,
      value: value,
    }
  );
  return resp.data;
};
