import Calendar from "./Calendar";
import "./home.css";
import { useState } from "react";
import Schedule from "./Schedule";
import SlotDetails from "./SlotDetails";

export default function Home() {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const [showDate, setShowDate] = useState(todayDate);
  const [showSlot, setShowSlot] = useState(null);
  return (
    <div id="home-page">
      <h1 id="home-header">Home</h1>
      <Calendar
        todayDate={todayDate}
        setShowDate={setShowDate}
        showDate={showDate}
      />
      <div id="holder">
        <Schedule showDate={showDate} setShowSlot={setShowSlot} />
        <SlotDetails showSlot={showSlot} />
      </div>
    </div>
  );
}
