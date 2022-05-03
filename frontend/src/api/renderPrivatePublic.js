const axios = require("axios");

export const publicPage = async () => {
  /*  return await axios.get("http://localhost:5000/api/public"); */
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.post("http://localhost:5000/api/group/create", {
      name: "TEK-ball Group",
      description: "usege of grenades instead of a football is mandatory!",
      token: token,
    });
    console.log(resp.status);
    return resp;
  } catch (err) {
    console.log(err);
    if (!err.response) return alert("network error");
    if (err.response.status === 400) {
      return alert("Bad request");
    }
    if (err.response.status === 401) {
      return alert("Unauthorized");
    }
    if (err.response.status === 409) {
      return alert("Group name already taken!");
    }
    return alert("Something went wrong");
  }
};
export const privatePage = async () => {
  const token = localStorage.getItem("token");
  /*   return await axios.get("http://localhost:5000/api/private", {
    headers: { token: token },
  }); */
  try {
    const resp = await axios.get("http://localhost:5000/api/group/list", {
      headers: { token: token },
    });
    console.log(resp.status);
    if (resp.status === 400) return alert("Something went wrong");
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    console.log(err);
    if (!err.response) return alert("network error");
    if (err.response.status === 400) {
      return alert("Bad request");
    }
    if (err.response.status === 401) {
      return alert("Unauthorized");
    }
    if (err.response.status === 409) {
      return alert("Group name already taken!");
    }
    return alert("Something went wrong");
  }
};
