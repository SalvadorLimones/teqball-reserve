import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { sendRegistration, checkUserOrEmail } from "../api/registrationFE";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const clearInputs = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setRegistered("");
  };

  const checkValid = async (type, value) => {
    const taken = await checkUserOrEmail(type, value);
    if (type === "username") {
      taken ? setUsernameTaken(true) : setUsernameTaken(false);
    }
    if (type === "email") {
      taken ? setEmailTaken(true) : setEmailTaken(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearInputs();
    const resp = await sendRegistration(username, email, password);
    setRegistered(resp);
  };

  return (
    <div>
      <Navbar />
      <div className="regPage">
        {!registered ? (
          <form className="regForm" onSubmit={handleSubmit}>
            <label>Register!</label>
            <div className="regInputDiv">
              <div className="inputDiv">
                <input
                  type="string"
                  name="username"
                  placeholder="username"
                  minLength={5}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    e.target.value.length >= 5 &&
                      checkValid("username", e.target.value);
                  }}
                  required
                />
                {usernameTaken && (
                  <p className="takenError">username already taken</p>
                )}
              </div>
              <div className="inputDiv">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    e.target.value.includes("@") &&
                      e.target.value.includes(".") &&
                      checkValid("email", e.target.value);
                  }}
                  required
                />
                {emailTaken && <p className="taken-error">email already taken</p>}
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
            <input type="submit" value="Register" />
          </form>
        ) : (
          <h1>{registered} successfully registered!</h1>
        )}
      </div>
    </div>
  );
};

export default Register;
