import React, { useState, useEffect } from "react";
import { listEvents, joinEvent, leaveEvent } from "../api/events";
import CreateEvent from "./CreateEvent";

const Events = ({ group_id }) => {
  const [eventResponse, setEventResponse] = useState(null);
  const [reload, setReload] = useState(false);

  const rerender = () => {
    console.log("rerender has been called");
    setReload(!reload);
  };

  const listTheEvents = async (group_id) => {
    console.log("listallgroups has been called");
    const res = await listEvents(group_id);
    console.log("VISSZAJÖTT: ", res.data);
    setEventResponse(res.data);
    console.log("eventResponse should be different now");
  };

  const handleJoinEvent = async (eventId) => {
    console.log('eventId is ', eventId);
    const res = await joinEvent(eventId);
    console.log(res);
  }

  const handleLeaveEvent = async (eventId) => {
    console.log('eventId is ', eventId);
    const res = await leaveEvent(eventId);
    console.log(res);
  }

  return (
    <div>
      <h3>Events</h3>
      <CreateEvent group_id={group_id} />
      <button onClick={() => listTheEvents(group_id)}>List Events</button>
      {eventResponse &&
        eventResponse.map((event, i) => (
          <div key={i} reload={rerender}>
            {event.name} <button onClick={() => handleJoinEvent(event._id)}>join</button>
            <button onClick={() => handleLeaveEvent(event._id)}>leave</button>
          </div>
        ))}
    </div>
  );
};

export default Events;
