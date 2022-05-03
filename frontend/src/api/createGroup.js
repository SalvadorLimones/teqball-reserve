const axios = require("axios");

export const createGroup = async (name, description) => {
    const token = localStorage.getItem("token");
    if (!token) console.log('please sign in first!')
    if (token) {
        const requestBody = { name: name, description: description, token: token };
        try { 
            const response = await axios.post("http://localhost:5000/api/group/create", requestBody)
            return response;
        } catch (error) {
            console.log('something has gone wrong! ', error);
            return error;
        }
    }
};