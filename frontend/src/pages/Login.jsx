import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { sendLogin } from "../api/loginFE";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearInputs();
    const resp = await sendLogin(username, password);
    localStorage.setItem("token", resp);

    if (resp) {
      navigate("/");
    } else {
      window.alert("wrong username or password!");
    }
  };

  return (
    <div className="loginPage">
      <Navbar />
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Login</label>
        <div className="loginInputDiv">
          <div className="inputDiv">
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
          <div className="inputDiv">
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
        </div>
        <input type="submit" value="Login" />
        <button className="resetButton" onClick={() => navigate("/reset")}>
          Forgot your password?
        </button>
      </form>
    </div>
  );
};

export default Login;
