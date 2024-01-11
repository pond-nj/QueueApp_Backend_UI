import Calendar from "./Calendar";
import "./explore.scss";
import { useState } from "react";
import Schedule from "./Schedule";
import SlotDetails from "./SlotDetails";
import { useEffect } from "react";
import Stats from "./Stats";

export default function Explore() {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const [showDate, setShowDate] = useState(todayDate);
  // TODO: change default
  const [showSlot, setShowSlot] = useState(null);

  return (
    <div id="explore-page">
      <Calendar
        todayDate={todayDate}
        setShowDate={setShowDate}
        showDate={showDate}
      />
      <div id="holder">
        <Schedule showDate={showDate} setShowSlot={setShowSlot} />
        <div id="details-holder">
          <SlotDetails showSlot={showSlot} />
          <Stats showSlot={showSlot} />
        </div>
      </div>
    </div>
  );
}
