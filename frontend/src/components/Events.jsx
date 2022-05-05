import React from "react";
import { listEvents } from "../api/events";
import CreateEvent from "./CreateEvent";

const Events = () => {
  return (
    <div>
      <h3>Events</h3>
      <CreateEvent />
    </div>
  );
};

export default Events;
