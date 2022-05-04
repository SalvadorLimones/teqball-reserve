import React, { useEffect, useState } from "react";
import { publicPage, privatePage } from "../api/renderPrivatePublic";
import Navbar from "../components/Navbar";
import jwt_decode from "jwt-decode";

import CreateGroup from "../components/CreateGroup";
import ListGroup from "./ListGroups";

const Homepage = () => {
  const [backendResponse, setbackendResponse] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    console.log("CHECK", decoded);
    if (token) setLoggedin(true);
  };

  const renderPublicPage = async () => {
    const res = await publicPage();
    setbackendResponse(res.data);
    console.log(res.data);
  };
  const renderPrivatePage = async () => {
    const res = await privatePage();
    console.log(res);
    setbackendResponse(res.data);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Homepage</h1>
      <button onClick={() => renderPublicPage()}>Public</button>
      <div className="groups">
        <CreateGroup />
        <ListGroup/>
      </div>
      {loggedin && <button onClick={() => renderPrivatePage()}>Private</button>}
      <h2>{backendResponse}</h2>
    </div>
  );
};

export default Homepage;
