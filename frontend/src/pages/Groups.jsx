import React from "react";
import Navbar from "../components/Navbar";
import CreateGroup from "../components/CreateGroup";
import ListGroups from "../components/ListGroups";

const Groups = () => {
  const authWithGoogle = () => {
    window.open(
      "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=940759968390-adatai7857f9o4vu7e5u53i6g4bk0rfl.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/calendar.events&redirect_uri=http://localhost:3000/callback"
    );
  };
  return (
    <div>
      <Navbar />
      <div className="group-actions">
        <CreateGroup />
        <button onClick={() => authWithGoogle()}>
          Connect to Google-calendar
        </button>
        <ListGroups />
      </div>
    </div>
  );
};

export default Groups;

//Client ID:
// 940759968390-adatai7857f9o4vu7e5u53i6g4bk0rfl.apps.googleusercontent.com

//Client secret:

// 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
