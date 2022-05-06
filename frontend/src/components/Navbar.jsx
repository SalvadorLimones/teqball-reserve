import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [userName, setUserName] = useState("");

  const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    if (token) {
      setUserName(decoded.username);
      setLoggedin(true);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className="navbar">
      <Link to="/" className="navbar-btn">
        <div>
          <p>HOMEPAGE</p>
        </div>
      </Link>

      {loggedin && (
        <Link to="/groups" className="navbar-btn">
          <div className="navbar-btn">
            <p>GROUPS</p>
          </div>
        </Link>
      )}
      {!loggedin ? (
        <>
          <Link to="/register" className="navbar-btn">
            <div>
              <p>REGISTER</p>
            </div>
          </Link>
          <Link to="/login" className="navbar-btn">
            <div className="navbar-btn">
              <p>LOGIN</p>
            </div>
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/"
            onClick={() => localStorage.clear()}
            className="navbar-btn"
          >
            <div className="navbar-btn">
              <p>LOGOUT</p>
            </div>
          </Link>
          <h6>Hi {userName}, you're logged in!</h6>
        </>
      )}
    </div>
  );
};

export default Navbar;
