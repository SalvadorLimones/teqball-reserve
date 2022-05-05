import React, { useState, useEffect } from "react";
import { listEvents, joinEvent, leaveEvent } from "../api/events";
import CreateEvent from "./CreateEvent";
import jwt_decode from "jwt-decode";

const Events = ({ group_id, my_status }) => {
  const [eventResponse, setEventResponse] = useState(null);
  const [reload, setReload] = useState(false);
  const [myId, setMyId] = useState("");

  const rerender = () => {
    console.log("rerender has been called");
    setReload(!reload);
  };

  const listTheEvents = async (group_id) => {
    const res = await listEvents(group_id);
    console.log("VISSZAJÖTT: ", JSON.stringify(res.data[0].participants));
    setEventResponse(res.data);
  };

  const handleJoinEvent = async (eventId) => {
    console.log("eventId is ", eventId);
    const res = await joinEvent(eventId);
    console.log(res);
  };

  const handleLeaveEvent = async (eventId) => {
    console.log("eventId is ", eventId);
    const res = await leaveEvent(eventId);
    console.log(res);
  };

  const getMyId = () => {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    setMyId(decode.user_id);
    console.log("MIID:", myId);
  };

  useEffect(() => {
    getMyId();
  }, []);

  return (
    <div>
      <h3>Events</h3>
      {(my_status === "owner" || my_status === "admin") && (
        <CreateEvent group_id={group_id} />
      )}
      <button onClick={() => listTheEvents(group_id)}>List Events</button>
      {eventResponse &&
        eventResponse.map((event, i) => (
          <div key={i} reload={rerender}>
            <p>Event name:{event.name}</p>
            <p>Venue: {event.venue}</p>
            <p>Date: {event.date.substring(0, 10)}</p>
            <ul>
              Participants:
              {event.participants.map((participant, i) => (
                <li key={i}>{participant.id}</li>
              ))}
            </ul>
            {JSON.stringify(event.participants).includes(myId) ? (
              <button onClick={() => handleLeaveEvent(event._id)}>leave</button>
            ) : (
              <button onClick={() => handleJoinEvent(event._id)}>join</button>
            )}
          </div>
        ))}
    </div>
  );
};

export default Events;
