import React, { useEffect, useState } from "react";
import { registrationConfirm } from "../api/registrationConfirmFE";
import { useNavigate } from "react-router-dom";

const Confirm = () => {
  const [message, setMessage] = useState("Loading...");
  const navigate = useNavigate();

  const confrimRegistration = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const username = urlParams.get("user");

    const allRight = await registrationConfirm(code, username);
    if (allRight.user_id) {
      console.log(allRight.user_id);
      window.alert(`Hi ${username}, your registration has been confirmed!`);
      navigate("/login");
    } else {
      setMessage(" :( incorrect or expired reg-code!");
    }
  };

  useEffect(() => {
    confrimRegistration();
  }, []);

  return <h1>{message}</h1>;
};

export default Confirm;
