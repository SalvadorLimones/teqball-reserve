import React from "react";
import { listEvents } from "../api/events";
import CreateEvent from "./CreateEvent";

const Events = ({ group_id }) => {
  return (
    <div>
      <h3>Events</h3>
      <CreateEvent group_id={group_id} />
    </div>
  );
};

export default Events;
