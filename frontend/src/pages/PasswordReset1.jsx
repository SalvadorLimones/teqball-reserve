import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { sendUsername } from "../api/passwordReset1FE";

const PasswordReset1 = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const clearInputs = () => {
    setUsername("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearInputs();
    const resp = await sendUsername(username);
    console.log(resp);
  };

  return (
    <div className="login-page">
      <Navbar />
      <h1>Password Reset Page 1</h1>
      <form className="reg-form" onSubmit={handleSubmit}>
        <label>send username </label>
        <div className="input-div">
          <input
            type="string"
            name="username"
            placeholder="username"
            minLength={5}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <input type="submit" value="Send Request" />
        <button className="reset-button" onClick={() => navigate("/login")}>
          back to login page
        </button>
      </form>
    </div>
  );
};

export default PasswordReset1;
