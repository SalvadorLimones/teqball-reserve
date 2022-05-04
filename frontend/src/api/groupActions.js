const axios = require("axios");

export const createGroup = async (name, description, setMessage) => {
    const token = localStorage.getItem("token");
    if (!token) console.log('please sign in first!')
    if (token) {
        const requestBody = { name: name, description: description, token: token };
        try { 
            const response = await axios.post("http://localhost:5000/api/group/create", requestBody);
            setMessage('Group created successfully!')
            return response;
        } catch (error) {
            console.log('something has gone wrong creating this group! ', error);
            setMessage('Something has gone wrong!')
            return error;
        }
    }
};

export const joinGroup = async (groupId) => {
    const token = localStorage.getItem("token");
    if (!token) console.log('please sign in first!');
    if (token) {
        const requestBody = { token: token, groupId: groupId };
        try { 
            const response = await axios.post("http://localhost:5000/api/group/join", requestBody);
            return response;
        } catch (error) {
            console.log('something has gone wrong joining this group! ', error);
            return error;
        }
    }
};

export const leaveGroup = async (groupId) => {
    const token = localStorage.getItem("token");
    if (!token) console.log('please sign in first!');
    if (token) {
        const requestBody = { token: token, groupId: groupId };
        try { 
            const response = await axios.post("http://localhost:5000/api/group/leave", requestBody);
            return response;
        } catch (error) {
            console.log('something has gone wrong leaving this group! ', error);
            return error;
        }
    }
};

export const getMembers = async (groupId) => {
    const token = localStorage.getItem("token");
    if (!token) console.log('please sign in first!');
    if (token) {
        const requestBody = { token: token, groupId: groupId };
        try { 
            const response = await axios.post("http://localhost:5000/api/group/users", requestBody);
            return response;
        } catch (error) {
            console.log('something has gone wrong fetching group members! ', error);
            return error;
        }
    }
}

