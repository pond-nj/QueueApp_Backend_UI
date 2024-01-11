import { DatePicker } from "@mui/x-date-pickers";
import { Chart } from "react-google-charts";

import "./analytics.scss";
import { useState } from "react";
import { style } from "../style.js";
import { StatsCards } from "../explore/Stats.jsx";

function DatePickerWrap({ onChange }) {
  return (
    <DatePicker
      slotProps={{
        // Targets the `IconButton` component.
        openPickerButton: {
          color: "primary",
        },
        // Targets the `InputAdornment` component.
        inputAdornment: {
          position: "start",
        },
        textField: { size: "small", sx: { backgroundColor: "white" } },
      }}
      onChange={onChange}
    />
  );
}

function Header({ setFromDate, setToDate }) {
  return (
    <div id="analytics-header" className="mb-4">
      <div>Select time period to view analytics</div>
      <div className="flex flex-row justify-between">
        <div>
          <span>
            <DatePickerWrap onChange={(date) => setFromDate(date)} />
          </span>
          -
          <span>
            <DatePickerWrap onChange={(date) => setToDate(date)} />
          </span>
        </div>
        <div className="flex flex-row gap-1">
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
    ["New customers", 11],
    ["Returning customers", 2],
  ];
  return (
    <div id="customer-number" className={`card ${className} flex flex-col`}>
      <div>Number of customer</div>
      <div className="min-h-0">
        <Chart
          chartType="PieChart"
          data={data}
          className="height-100"
          options={{
            pieSliceText: "none",
            pieHole: 0.4,
            is3D: false,
            legend: "none",
            slices: {
              0: { color: style.lightMainColor },
              1: { color: style.lightSubColor },
            },
            backgroundColor: "transparent",
            chartArea: {
              top: "10%",
              height: "50%",
            },
          }}
        />
      </div>
      <div className="flex flex-row gap-1 justify-center items-center">
        <div className="light-main-color w-3 h-3 inline-block rounded"></div>
        <span>New customers</span>
        <div className="light-sub-color w-3 h-3 inline-block rounded"></div>
        <span>Returning customers</span>
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
      <div className="">Day occupancy</div>
      <div className="min-h-0">
        <Chart
          chartType="ColumnChart"
          data={data}
          options={{
            chartArea: {
              // leave room for y-axis labels
              width: "100%",
            },
            bar: { groupWidth: "50%" },
            legend: { position: "none" },
            backgroundColor: "transparent",
            colors: [style.lightSubColor],
            chartArea: {
              top: "10%",
              height: "40%",
              width: "90%",
            },
          }}
        />
      </div>
    </div>
  );
}

function PopularVisitTime({ className }) {
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
    <div id="popular-visit-time" className={`card ${className}`}>
      <div>Popular time of visit</div>
      <div>
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
              height: "40%",
              width: "90%",
            },
          }}
        />
      </div>
    </div>
  );
}

function BookingsNumber({ className }) {
  const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];

  const options = {
    legend: { position: "none" },
    label: { position: "none" },
    chartArea: { height: "40%", top: "10%" },
    backgroundColor: "transparent",
    colors: [style.lightSubColor],
  };

  return (
    <div id="bookings-number" className={`card ${className}`}>
      <div>Number of bookings</div>
      <div>
        <Chart chartType="AreaChart" data={data} options={options} />
      </div>
    </div>
  );
}

function AverageSuccessBookingRate({ className }) {
  // TODO: fix chart height and stats card height should be 2:1
  const data = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
  ];

  const options = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "80%", height: "30%" },
    isStacked: true,
    backgroundColor: "transparent",
    colors: [style.lightSubColor, style.lightMainColor],
  };
  return (
    <div
      id="average-success-booking-rate"
      className={`card ${className} stats`}
    >
      <div>Average success booking rate</div>
      <div className="flex flex-col min-h-0">
        <StatsCards className="stats-card min-h-0" />
        <div id="chart" className="min-h-0">
          <Chart chartType="ColumnChart" data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  return (
    <div id="analytics" className="flex flex-col h-full">
      <Header setFromDate={setFromDate} setToDate={setToDate} />
      <div className="flex flex-row gap-2 min-h-0">
        <div className="flex flex-col gap-2 flex-[2] min-w-0">
          <CustomerNumber className="flex-[3] min-h-0" />
          <DayOccupancy className="flex-[2] min-h-0" />
          <PopularVisitTime className="flex-[2] min-h-0" />
        </div>
        <div className="flex flex-col gap-2 flex-[3] min-w-0">
          <BookingsNumber className="flex-1 min-h-0" />
          <AverageSuccessBookingRate className="flex-1 min-h-0" />
        </div>
      </div>
    </div>
  );
}
