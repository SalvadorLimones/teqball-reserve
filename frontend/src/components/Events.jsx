import React, { useState, useEffect } from "react";
import { listEvents } from "../api/events";
import CreateEvent from "./CreateEvent";

const Events = ({group_id}) => {

  const [eventResponse, setEventResponse] = useState(null);
  const [reload, setReload] = useState(false);

  const rerender = () => {
    console.log('rerender has been called')
    setReload(!reload)
  }

  const listTheEvents = async () => {
    console.log('listallgroups has been called')
    const res = await listEvents();
    console.log(res.data);
    setEventResponse(res.data);
    console.log('eventResponse should be different now');
  };

  useEffect(() => {
    listTheEvents()
  }, [reload])

  return (
    <div>
      <h3>Events</h3>
      <CreateEvent group_id={group_id}/>
      <button onClick={listTheEvents}>List Events</button>
      {
        eventResponse && eventResponse.map((event, i) => (
          <div key={i} reload={rerender}>{event.date}</div>
        ))
      }
    </div>
  );
};

export default Events;
