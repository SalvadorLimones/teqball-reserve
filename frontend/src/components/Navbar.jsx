import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
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
    <div className="navbar">
      <Link to="/" className="navbar-btn">
        <div>
          <p>HOMEPAGE</p>
        </div>
      </Link>
      <Link to="/register" className="navbar-btn">
        <div>
          <p>REGISTER</p>
        </div>
      </Link>
      {loggedin &&
        <Link to="/groups" className="navbar-btn">
          <div className="navbar-btn">
            <p>GROUPS</p>
          </div>
        </Link>
      }
      {!loggedin ? (
        <Link to="/login" className="navbar-btn">
          <div className="navbar-btn">
            <p>LOGIN</p>
          </div>
        </Link>
      ) : (
        <Link
          to="/"
          onClick={() => localStorage.clear()}
          className="navbar-btn"
        >
          <div className="navbar-btn">
            <p>LOGOUT</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
