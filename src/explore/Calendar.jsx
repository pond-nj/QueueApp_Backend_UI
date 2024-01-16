import { useEffect, useState } from "react";

function LeftRightButton({ onClick, left, right, disabled }) {
  const text = left ? "<" : ">";
  if (disabled) {
    return (
      <button disabled className="left-right-button">
        {text}
      </button>
    );
  }
  return (
    <button className="left-right-button" onClick={onClick}>
      {text}
    </button>
  );
}

function findStartWeekDate(date) {
  const newStartDate = new Date(date);
  while (newStartDate.getDay() !== 0) {
    newStartDate.setDate(newStartDate.getDate() - 1);
  }
  return newStartDate;
}

export default function Calendar({
  showDate,
  setShowDate,
  todayDate,
  setShowSlot,
}) {
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

  const setDateWrap = (date) => {};

  const MonthSelect = () => {
    const showYear = startCalendarDate.getFullYear();
    // TODO: when come back to the selected month, jump to the selected date
    function ButtonLeft() {
      if (month === 0) {
        return <LeftRightButton left disabled />;
      } else {
        return (
          <LeftRightButton
            onClick={() => {
              // TODO: allow month from Dec 2023 -> Jan 2024
              let newStartDate = new Date(startCalendarDate);
              newStartDate.setMonth(month - 1);
              newStartDate.setDate(1);
              newStartDate = new Date(newStartDate);
              setStartCalendarDate(newStartDate);
              setMonth(month - 1);
            }}
            left
          />
        );
      }
    }

    function ButtonRight() {
      if (month === 11) {
        return <LeftRightButton right disabled />;
      } else {
        return (
          // TODO: allow month from Dec 2023 <- Jan 2024
          <LeftRightButton
            onClick={() => {
              let newStartDate = new Date(startCalendarDate);
              newStartDate.setMonth(month + 1);
              newStartDate.setDate(1);
              newStartDate = findStartWeekDate(newStartDate);
              setStartCalendarDate(newStartDate);
              setMonth(month + 1);
            }}
            right
          />
        );
      }
    }

    return (
      <div>
        <span>
          {monthMapping[month]} {showYear}
        </span>
        <ButtonLeft />
        <ButtonRight />
      </div>
    );
  };

  const WeekSelect = () => {
    function ButtonLeft() {
      return (
        <LeftRightButton
          left
          onClick={() => {
            const newDate = new Date(startCalendarDate);
            newDate.setDate(startCalendarDate.getDate() - 7);
            setStartCalendarDate(newDate);
            setMonth(newDate.getMonth());
          }}
        />
      );
    }

    function ButtonRight() {
      return (
        <LeftRightButton
          right
          onClick={() => {
            const newDate = new Date(startCalendarDate);
            newDate.setDate(startCalendarDate.getDate() + 7);
            setStartCalendarDate(newDate);
            setMonth(newDate.getMonth());
          }}
        />
      );
    }

    // iterate to show days in a week
    const startCalendarDateList = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(startCalendarDate);
      newDate.setDate(startCalendarDate.getDate() + i);
      newDate.setHours(0, 0, 0, 0);
      startCalendarDateList.push(newDate);
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
                setShowSlot(null);
              }}
              className="date-button"
            >
              <div className="week-day-label">{days[weekDay]}</div>
              <div
                className={
                  showDate.getTime() === date.getTime()
                    ? "selected-week-date week-date-label"
                    : "week-date-label"
                }
              >
                {date.getDate()}
              </div>
            </button>
          );
        })}
        <ButtonRight />
      </div>
    );
  };

  const TodayButton = () => {
    return (
      <div>
        <button
          onClick={() => {
            setShowDate(todayDate);
            setStartCalendarDate(findStartWeekDate(todayDate));
            setMonth(todayDate.getMonth());
            setShowSlot(null);
          }}
        >
          Today
        </button>
      </div>
    );
  };

  return (
    <div id="calendar">
      <div id="calendar-header">
        <MonthSelect />
        <TodayButton />
      </div>
      <WeekSelect />
    </div>
  );
}
