import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendGoogleAuth } from "../api/googleAuthFE";

const GoogleCalendar = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getToken = async () => {
    let code = searchParams.get("code");
    const resp = await sendGoogleAuth(code);
    if (resp) {
      console.log("GOOGLE RESP: ", resp);
      /*       localStorage.setItem("token", resp);
      navigate("/"); */
    } else {
      window.alert("authentification faliled!");
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  return <div>GoogleCalendar</div>;
};

export default GoogleCalendar;
