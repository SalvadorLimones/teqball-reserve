import React, { useState, useEffect } from "react";
import { listEvents } from "../api/events";
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

  return (
    <div>
      <h3>Events</h3>
      <CreateEvent group_id={group_id} />
      <button onClick={() => listTheEvents(group_id)}>List Events</button>
      {eventResponse &&
        eventResponse.map((event, i) => (
          <div key={i} reload={rerender}>
            {event.name}
          </div>
        ))}
    </div>
  );
};

export default Events;
