import { useEffect, useState } from "react";

async function loadSchedule() {
  // const response = await fetch('http://localhost:3000/schedule');
  // const data = await response.json();
  // return data;

  const data = {
    10: [
      {
        until: 11,
        name: "test 10",
        contact: "contact 10-11",
      },
      {
        until: 12,
        name: "test 10-12",
        contact: "contact 10-12",
      },
    ],
    11: [
      {
        until: 12,
        name: "test 11-12",
        contact: "contact 11-12",
      },
    ],
    12: [
      {
        until: 13,
        name: "test 12-13",
        contact: "contact 12-13",
      },
      { until: 14, name: "test 12-14", contact: "contact 12-14" },
      { until: 15, name: "test 12-15", contact: "contact 12-15" },
      { until: 16, name: "test 12-16", contact: "contact 12-16" },
    ],
  };

  return data;
}

export default function Schedule({ showDate, setShowSlot }) {
  const [loaded, setLoaded] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    loadSchedule().then((data) => {
      setLoaded(true);
      setScheduleList(data);
      setShowSlot(data[Object.keys(data)[0]][1]);
    });
  }, []);

  function ScheduleSlots() {
    const keys = Object.keys(scheduleList).sort();
    return keys.map((k) => {
      return (
        <div>
          <div key={k}>{k}</div>
          <div id="schedule-slots">
            {scheduleList[k].map((s) => {
              return (
                <button
                  onClick={() => {
                    setShowSlot(s);
                  }}
                  key={k + "-" + s.until}
                  className="slot"
                >
                  <div>
                    {k} - {s.until}
                  </div>
                  <div>{s.name}</div>
                  <div>{s.contact}</div>
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <div id="schedule">
      <h2>Schedule</h2>
      {loaded ? (
        <div id="slots-holder">
          <ScheduleSlots />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
