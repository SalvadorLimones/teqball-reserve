const axios = require("axios");

export const listGroups = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.alert("Please log in first");

    if (token) {
        try { 
            const response = await axios.get("http://localhost:5000/api/group/list", {
                headers: { token: token },
              })
            //   console.log(response)
            return response;
        } catch (error) {
            console.log('something has gone wrong! ', error);
            return error;
        }
    }
};