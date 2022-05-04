import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import jwt_decode from "jwt-decode";

import CreateGroup from "../components/CreateGroup";
import ListGroup from "./ListGroups";

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
    <div>
      <Navbar />
      <h1>Homepage</h1>

      <div className="groups">
        <CreateGroup />
        <ListGroup />
      </div>
    </div>
  );
};

export default Homepage;
