import { useState } from "react";

export default function Calendar({ showDate, setShowDate, todayDate }) {
  const [month, setMonth] = useState(0);
  const startDate = new Date();
  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }
  const [startCalendarDate, setStartCalendarDate] = useState(startDate);
  const monthMapping = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function MonthSelect() {
    // TODO: when come back to the selected month, jump to the selected date
    function ButtonLeft() {
      if (month === 0) {
        return <button disabled>{"<"}</button>;
      } else {
        return (
          <button
            onClick={() => {
              const newStartDate = new Date(startCalendarDate);
              newStartDate.setMonth(month - 1);
              newStartDate.setDate(1);
              while (newStartDate.getDay() !== 0) {
                newStartDate.setDate(newStartDate.getDate() - 1);
              }
              setStartCalendarDate(newStartDate);
              setMonth(month - 1);
            }}
          >
            {"<"}
          </button>
        );
      }
    }

    function ButtonRight() {
      if (month === 11) {
        return <button disabled>{">"}</button>;
      } else {
        return (
          <button
            onClick={() => {
              const newStartDate = new Date(startCalendarDate);
              newStartDate.setMonth(month + 1);
              newStartDate.setDate(1);
              while (newStartDate.getDay() !== 0) {
                newStartDate.setDate(newStartDate.getDate() - 1);
              }
              setStartCalendarDate(newStartDate);
              setMonth(month + 1);
            }}
          >
            {">"}
          </button>
        );
      }
    }

    return (
      <>
        <ButtonLeft />
        <span>{monthMapping[month]}</span>
        <ButtonRight />
      </>
    );
  }

  const WeekSelect = () => {
    function ButtonLeft() {
      return (
        <button
          onClick={() => {
            const newDate = new Date(startCalendarDate);
            newDate.setDate(startCalendarDate.getDate() - 7);
            setStartCalendarDate(newDate);
          }}
        >
          {"<"}
        </button>
      );
    }

    function ButtonRight() {
      return (
        <button
          onClick={() => {
            const newDate = new Date(startCalendarDate);
            newDate.setDate(startCalendarDate.getDate() + 7);
            setStartCalendarDate(newDate);
          }}
        >
          {">"}
        </button>
      );
    }

    const startCalendarDateList = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(startCalendarDate);
      newDate.setDate(startCalendarDate.getDate() + i);
      newDate.setHours(0, 0, 0, 0);
      startCalendarDateList.push(newDate);
    }

    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    return (
      <div id="week-select">
        <ButtonLeft />
        {startCalendarDateList.map((date) => {
          const weekDay = date.getDay();
          return (
            <button
              key={date.getTime()}
              onClick={() => {
                setShowDate(date);
              }}
            >
              <div>{days[weekDay]}</div>
              <div>{date.getDate()}</div>
              {todayDate.getTime() === date.getTime() ? <div>today</div> : null}
              {showDate.getTime() === date.getTime() ? (
                <div>selected</div>
              ) : null}
            </button>
          );
        })}
        <ButtonRight />
      </div>
    );
  };

  return (
    <div id="calendar">
      <MonthSelect />
      <WeekSelect />
    </div>
  );
}
