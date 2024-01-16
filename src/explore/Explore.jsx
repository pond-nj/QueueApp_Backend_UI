import Calendar from "./Calendar";
import "./explore.scss";
import { useState } from "react";
import Schedule from "./Schedule";
import SlotDetails from "./SlotDetails";
import { useEffect } from "react";
import Stats from "./Stats";

export default function Explore({ scheduleMap, loaded }) {
  console.log(scheduleMap);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const [showDate, setShowDate] = useState(todayDate);
  // TODO: change default
  const [showSlot, setShowSlot] = useState(
    scheduleMap[todayDate.toLocaleDateString()][0]
  );

  return (
    <div id="explore-page">
      <Calendar
        todayDate={todayDate}
        setShowDate={setShowDate}
        showDate={showDate}
        setShowSlot={setShowSlot}
      />
      <div id="holder">
        <Schedule
          showDate={showDate}
          setShowSlot={setShowSlot}
          scheduleMap={scheduleMap}
          loaded={loaded}
        />
        <div id="details-holder" className="flex flex-col space-y-2">
          {loaded ? <SlotDetails showSlot={showSlot} loaded={loaded} /> : null}
          <Stats scheduleMap={scheduleMap} />
        </div>
      </div>
    </div>
  );
}
