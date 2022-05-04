import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Confirm from "./pages/Confirm";
import PasswordReset1 from "./pages/PasswordReset1";
import PasswordReset2 from "./pages/PasswordReset2";
import Groups from "./pages/Groups";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="groups" element={<Groups />}></Route>
          <Route path="confirm" element={<Confirm />}></Route>
          <Route path="reset" element={<PasswordReset1 />}></Route>
          <Route path="password" element={<PasswordReset2 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
