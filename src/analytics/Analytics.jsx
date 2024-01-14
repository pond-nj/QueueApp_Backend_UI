import { DatePicker } from "@mui/x-date-pickers";
import { Chart } from "react-google-charts";

import "./analytics.scss";
import { useState } from "react";
import { style } from "../style.js";
import dayjs from "dayjs";

function DatePickerWrap({ onChange }) {
  const [value, setValue] = useState(dayjs());

  return (
    <DatePicker
      slotProps={{
        // Targets the `IconButton` component.
        openPickerButton: {
          style: { color: "#938fc7" },
        },
        // Targets the `InputAdornment` component.
        inputAdornment: {
          position: "start",
        },
        textField: { size: "small", sx: { backgroundColor: "white" } },
      }}
      value={value}
      onChange={(e) => {
        setValue(e);
        onChange(e);
      }}
    />
  );
}

function Header({ setFromDate, setToDate }) {
  return (
    <div id="analytics-header" className="mb-4">
      <div>Select time period to view analytics</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-1 content-center">
          <span>
            <DatePickerWrap onChange={(date) => setFromDate(date)} />
          </span>
          <span className="flex flex-col justify-center">&#8212;</span>
          <span>
            <DatePickerWrap onChange={(date) => setToDate(date)} />
          </span>
        </div>
        <div className="flex flex-row space-x-4">
          <button className="border-button">Today</button>
          <button className="border-button">This Week</button>
          <button className="border-button">This month</button>
          <button>Download</button>
        </div>
      </div>
    </div>
  );
}

function CustomerNumber({ className }) {
  const data = [
    ["Task", "Hours per Day"],
    ["New customers", 4],
    ["Returning customers", 11],
  ];
  return (
    <div id="customer-number" className={`card ${className} flex flex-col`}>
      <div className="text-lg font-bold">Number of customer</div>
      <div className="min-h-0 flex-1">
        <Chart
          chartType="PieChart"
          data={data}
          className="height-100"
          options={{
            pieSliceText: "none",
            pieHole: 0.6,
            is3D: false,
            legend: "none",
            slices: {
              0: { color: style.lightMainColor },
              1: { color: style.lightSubColor },
            },
            backgroundColor: "transparent",
            chartArea: {
              top: "10%",
              height: "70%",
            },
          }}
        />
      </div>
      <div className="flex flex-row space-x-4 justify-center">
        <div className="flex flex-row justify-center items-center space-x-2">
          <span className="bg-light-sub-color w-6 h-6 inline-block rounded-lg"></span>
          <span>New customers</span>
        </div>
        <div className="flex flex-row justify-center items-center space-x-2">
          <span className="bg-light-main-color w-6 h-6 inline-block rounded-lg"></span>
          <span>Returning customers</span>
        </div>
      </div>
    </div>
  );
}

function DayOccupancy({ className }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const data = [
    [
      "Element",
      "Density",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ...days.map((day, index) => [day, index, null, null]),
  ];

  return (
    <div id="day-occupancy" className={`card ${className} flex flex-col`}>
      <div className="text-lg font-bold">Day occupancy</div>
      <div className="min-h-0 flex-1">
        <Chart
          chartType="ColumnChart"
          data={data}
          options={{
            bar: { groupWidth: "50%" },
            legend: { position: "none" },
            backgroundColor: "transparent",
            colors: [style.lightSubColor],
            chartArea: {
              top: "10%",
              width: "90%",
            },
            vAxis: { title: "No. of customers" },
          }}
        />
      </div>
    </div>
  );
}

function PopularVisitTime({ className }) {
  const times = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const data = [
    [
      "Element",
      "Density",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ...times.map((day, index) => [day, index, null, null]),
  ];

  return (
    <div id="popular-visit-time" className={`card ${className} flex flex-col`}>
      <div className="text-lg font-bold">Popular time of visit</div>
      <div className="flex-1">
        <Chart
          chartType="ColumnChart"
          data={data}
          options={{
            bar: { groupWidth: "50%" },
            legend: { position: "none" },
            backgroundColor: "transparent",
            colors: [style.lightSubColor],
            chartArea: {
              top: "10%",
              width: "90%",
            },
            vAxis: { title: "No. of customers" },
          }}
        />
      </div>
    </div>
  );
}

function BookingsNumber({ className }) {
  const data = [
    ["Date", "Sales"],
    ["10/31", 1000],
    ["11/01", 1170],
    ["11/02", 660],
    ["11/03", 1030],
    ["11/04", 1170],
    ["11/05", 660],
    ["11/06", 1030],
    ["11/07", 1170],
    ["11/08", 660],
    ["11/09", 1030],
    ["11/10", 1170],
    ["11/11", 660],
    ["11/12", 1030],
  ];

  const options = {
    legend: { position: "none" },
    label: { position: "none" },
    chartArea: { top: "20%", right: "5%", left: "10%" },
    backgroundColor: "transparent",
    colors: [style.lightSubColor],
    vAxis: { title: "in Thousands (US$)" },
    hAxis: { title: "Forcast dates" },
    curveType: "function",
  };

  return (
    <div id="bookings-number" className={`card ${className} flex flex-col`}>
      <div className="text-lg font-bold">Number of bookings</div>

      <div className="flex-1">
        <Chart chartType="AreaChart" data={data} options={options} />
      </div>
      {/* </div> */}
    </div>
  );
}

function AverageSuccessBookingRate({ className, scheduleList }) {
  // TODO: fix chart height and stats card height should be 2:1
  const data = [
    ["Weeks", "Cancelled/no show bookings", "Completed bookings"],
    ["Week 1", 375, 600],
    ["Week 2", 125, 625],
    ["Week 3", 125, 375],
    ["Week 4", 475, 200],
    ["Week 5", 300, 350],
  ];

  const cancelCount = 0;
  console.log(scheduleList);

  const now = new Date();

  function StatsCards({ className }) {
    return (
      <div id="stats-card-wrapper" className={className}>
        <div className="stats-card">
          <div className="stats-card-text">Success rate</div>
          <span className="stats-card-number">
            {((scheduleList.length - cancelCount) / scheduleList.length) * 100}%
          </span>
        </div>
        <div className="stats-card">
          <div className="stats-card-text">No show bookings</div>
          <span className="stats-card-number">{cancelCount}</span>
        </div>
        <div className="stats-card">
          <div className="stats-card-text">Completed bookings</div>
          <span className="stats-card-number">
            {/* TODO: Time */}
            {scheduleList.filter((s) => {
              const date = new Date(
                s.date + "T" + s.end_time
              ).toLocaleDateString();
              console.log(date);
              return now < date;
            })}
          </span>
        </div>
      </div>
    );
  }

  const options = {
    bar: { groupWidth: "20%" },
    chartArea: { width: "80%", height: "70%", top: "20%" },
    isStacked: true,
    backgroundColor: "transparent",
    colors: [style.lightSubColor, style.lightMainColor],
    legend: { position: "none" },
  };

  return (
    <div
      id="average-success-booking-rate"
      className={`card ${className} stats space-y-2 flex-1`}
    >
      <div className="text-lg font-bold">Average success booking rate</div>
      {/* <div className="flex flex-col min-h-0 flex-1"> */}
      <StatsCards className="stats-card min-h-0" />
      <div id="chart" className="min-h-0 flex-1">
        <Chart chartType="ColumnChart" data={data} options={options} />
      </div>
      <div className="flex flex-row space-x-4 justify-center">
        <div className="flex flex-row justify-center items-center space-x-2">
          <span className="bg-light-sub-color w-6 h-6 inline-block rounded-lg"></span>
          <span>Completed bookings</span>
        </div>
        <div className="flex flex-row justify-center items-center space-x-2">
          <span className="bg-light-main-color w-6 h-6 inline-block rounded-lg"></span>
          <span>Cancelled/no show bookings</span>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default function Analytics({ scheduleList }) {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  return (
    <div id="analytics" className="flex flex-col h-full">
      <Header setFromDate={setFromDate} setToDate={setToDate} />
      <div className="flex flex-row gap-2 min-h-0">
        <div className="flex flex-col gap-2 flex-[2] min-w-0">
          <CustomerNumber className="flex-[2] min-h-0" />
          <DayOccupancy className="flex-[2] min-h-0" />
          <PopularVisitTime className="flex-[2] min-h-0" />
        </div>
        <div className="flex flex-col gap-2 flex-[3] min-w-0">
          <BookingsNumber className="flex-1 min-h-0" />
          <AverageSuccessBookingRate
            className="flex-1 min-h-0"
            scheduleList={scheduleList}
          />
        </div>
      </div>
    </div>
  );
}
