import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { sendPasswordreset } from "../api/passwordReset2FE";

const PasswordReset2 = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const username = urlParams.get("user");
    const resp = await sendPasswordreset(code, username, password);
    navigate("/login");
    setPassword("");
  };

  return (
    <div className="login-page">
      <Navbar />
      <h1>Password Reset Page 2</h1>
      <form className="reg-form" onSubmit={handleSubmit}>
        <label>reset your password here</label>
        <div className="input-div">
          <input
            type="password"
            name="password"
            placeholder="password"
            minLength={5}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <input type="submit" value="Send Request" />
      </form>
    </div>
  );
};

export default PasswordReset2;
