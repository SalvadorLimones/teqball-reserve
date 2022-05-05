import React, { useState, useEffect } from "react";
import { listEvents } from "../api/events";
import CreateEvent from "./CreateEvent";

const Events = ({ group_id, my_status }) => {
  const [eventResponse, setEventResponse] = useState(null);
  const [reload, setReload] = useState(false);

  const rerender = () => {
    console.log("rerender has been called");
    setReload(!reload);
  };

  const listTheEvents = async (group_id) => {
    const res = await listEvents(group_id);
    console.log("VISSZAJÖTT: ", res.data);
    setEventResponse(res.data);
  };

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
          </div>
        ))}
    </div>
  );
};

export default Events;
