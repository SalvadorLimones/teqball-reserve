import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import jwt_decode from "jwt-decode";

const Homepage = () => {
  const [loggedin, setLoggedin] = useState(false);

  const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    console.log("CHECK", decoded);
    if (token) setLoggedin(true);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <div>
        <h1>Homepage</h1>
        <div className="homepageDiv">
          <h3>Welcome to our weird little website! Facebook is too mainstream, amirite?</h3>
          <p>Head over to the GROUPS tab and join some groups I guess..? Or don't. Do whatever you want, I'm not your boss.</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
