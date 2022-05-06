import React, { useState, useEffect } from "react";
import { listEvents, joinEvent, leaveEvent } from "../api/events";
import CreateEvent from "./CreateEvent";
import jwt_decode from "jwt-decode";

const Events = ({ group_id, my_status }) => {
  const [eventResponse, setEventResponse] = useState(null);
  const [myId, setMyId] = useState("");
  const [render, setRender] = useState(false);

  const listTheEvents = async (group_id) => {
    const res = await listEvents(group_id);
    console.log("VISSZAJÖTT: ", JSON.stringify(res.data[0].participants));
    setEventResponse(res.data);
  };

  const handleJoinEvent = async (eventId) => {
    const res = await joinEvent(eventId);
    console.log(res);
    setRender(!render);
  };

  const handleLeaveEvent = async (eventId) => {
    const res = await leaveEvent(eventId);
    console.log(res);
    setRender(!render);
  };

  const getMyId = () => {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    setMyId(decode.user_id);
  };

  useEffect(() => {
    getMyId();
  }, []);

  useEffect(() => {
    listTheEvents(group_id);
  }, [render]);

  return (
    <div>
      <h3>Events</h3>
      {(my_status === "owner" || my_status === "admin") && (
        <CreateEvent group_id={group_id} />
      )}
      <button onClick={() => listTheEvents(group_id)}>List Events</button>
      <div className="events">{eventResponse &&
        eventResponse.map((event, i) => (
          <div key={i}>
            <p>Event name: {event.name}</p>
            <p>Venue: {event.venue}</p>
            <p>Date: {event.date.substring(0, 10)}</p>
            <ul>
              Participants:
              {event.participants.map((participant, i) => (
                <li key={i}>{participant.name}</li>
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
    </div>
  );
};

export default Events;
