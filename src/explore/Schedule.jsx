import { User } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { style } from "../style";
import { Phone, Seal } from "@phosphor-icons/react";
import { BACKEND_URL, SHOP_ID } from "../demoConfig";

function SlotCard({ time, name, contact, type, onClick }) {
  const iconSize = "1rem";
  return (
    <div className="slot-card" onClick={onClick}>
      <div className="slot-card-header">
        <span>{time}</span>
        <span className="arrow">&#8594;</span>
      </div>
      <div className="slot-card-details">
        <div className="flex flex-row space-x-4 items-center">
          <User size={iconSize} color={style.lightSubColor} weight="fill" />
          <div>{name}</div>
        </div>

        <div className="flex flex-row space-x-4 items-center">
          <Phone size={iconSize} color={style.lightSubColor} weight="fill" />
          <div>{contact}</div>
        </div>

        <div className="flex flex-row space-x-4 items-center">
          <Seal size={iconSize} color={style.lightSubColor} weight="fill" />
          <div>{type}</div>
        </div>
      </div>
    </div>
  );
}

function SlotList({ scheduleMap, showDate, setShowSlot }) {
  // 11 -> 11:00
  function parseTime(time) {
    if (time.length === 5) return time;
    else return `${time}:00`;
  }

  function parseDate(date) {
    const dateObj = new Date(date);
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "numeric",
    };
    return dateObj.toLocaleDateString("en", options);
  }

  if (!scheduleMap[showDate.toLocaleDateString()]) return null;

  return scheduleMap[showDate.toLocaleDateString()].map((ap) => {
    return (
      <SlotCard
        time={`${parseTime(ap.start_time)} - ${parseTime(ap.end_time)}`}
        key={ap.id}
        name={ap.user.User_name}
        contact={ap.user.phone_number}
        type={ap.service_name}
        onClick={() => {
          console.log("clicked");
          setShowSlot(ap);
        }}
      />
    );
  });
}
export default function Schedule({
  showDate,
  setShowSlot,
  scheduleMap,
  loaded,
}) {
  return (
    <div id="schedule">
      <h2 id="schedule-header">Schedule</h2>
      {loaded ? (
        <div id="show-slots">
          <div id="slots-holder">
            <SlotList
              scheduleMap={scheduleMap}
              showDate={showDate}
              setShowSlot={setShowSlot}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
