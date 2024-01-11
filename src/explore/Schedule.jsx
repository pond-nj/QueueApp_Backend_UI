import { useEffect, useState } from "react";

async function loadSchedule() {
  // const response = await fetch('http://localhost:3000/schedule');
  // const data = await response.json();
  // return data;

  const data = [];
  for (let i = 0; i < 14; i++)
    data.push({
      name: "Vicky",
      contact: "1234-5678",
      remarks: "no-remark",
      type: "haircut",
      price: "$10",
      time: "10:00 - 11.00",
      discount: "15%",
      bookingCode: "14ER8Q",
    });
  return data;
}

function SlotCard({ time, name, contact, type }) {
  return (
    <div className="slot-card">
      <div className="slot-card-header">
        <span>{time}</span>
        <span className="arrow">&#8594;</span>
      </div>
      <div className="slot-card-details">
        <div>{name}</div>
        <div>{contact}</div>
        <div>{type}</div>
      </div>
    </div>
  );
}

export default function Schedule({ showDate, setShowSlot }) {
  const [loaded, setLoaded] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    loadSchedule().then((data) => {
      setLoaded(true);
      setScheduleList(data);
      setShowSlot(data[0]);
    });
  }, [showDate]);

  function ScheduleSlots() {
    // TODO: last slot should not have border-bottom
    return (
      <div id="show-slots">
        <div id="slots-holder">
          {scheduleList.map((k, idx) => {
            return (
              <SlotCard
                time={"10:00 - " + (11 + idx) + ":00"}
                key={idx}
                name={"Vicky"}
                contact={"1234-5678"}
                type={"manicure and spa"}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div id="schedule">
      <h2 id="schedule-header">Schedule</h2>
      {loaded ? <ScheduleSlots /> : <p>Loading...</p>}
    </div>
  );
}
