import React, { useState } from "react";
import { addEvent } from "../api/events";

const CreateEvent = ({ group_id }) => {
  const [eventName, setEventName] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDate, setEventDate] = useState("");

  const clearInputs = () => {
    setEventName("");
    setEventVenue("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearInputs();
    addEvent(group_id, eventName, eventVenue, eventDate);
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <form className="reg-form" onSubmit={handleSubmit}>
        <label>
          Please choose a name, a venue and pick a date for the event!
        </label>
        <div className="input-div">
          <input
            type="string"
            name="event-name"
            placeholder="event-name"
            minLength={5}
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="input-div">
          <input
            type="textarea"
            name="event-venue"
            placeholder="event-venue"
            minLength={5}
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
            required
          />
        </div>
        <div className="input-div">
          <input
            type="date"
            name="event-date"
            placeholder="event-date"
            min={new Date().toLocaleDateString("en-ca")}
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateEvent;
