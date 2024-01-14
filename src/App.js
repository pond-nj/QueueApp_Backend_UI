import "./App.css";
import SideBar from "./SideBar";

import ErrorPage from "./error-page";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Explore from "./explore/Explore";
import Analytics from "./analytics/Analytics";
import { useState, useEffect } from "react";
import { BACKEND_URL, SHOP_ID } from "./demoConfig";

function App() {
  const [loaded, setLoaded] = useState(false);

  async function loadSchedule() {
    const appointmentList = [];
    return await fetch(`${BACKEND_URL}/shop/${SHOP_ID}/`)
      .then((res) => res.json())
      .then(async (res) => {
        for (const ap of res.data.relationships.appointment_set.data) {
          await fetch(`${BACKEND_URL}/appointment/${ap.id}/`)
            .then((res) => res.json())
            .then(async (data) => {
              const user = await fetch(
                `${BACKEND_URL}/user/${data.data.relationships.user.data.id}/`
              )
                .then((res) => res.json())
                .then((data) => {
                  return data.data.attributes;
                });

              appointmentList.push({
                ...data.data.attributes,
                user: user,
                id: ap.id,
              });
            });
        }

        return appointmentList;
      });
  }

  useEffect(() => {
    loadSchedule().then((data) => {
      setLoaded(true);
      setScheduleList(data);
    });
  }, []);

  const [scheduleList, setScheduleList] = useState([]);

  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <SideBar />
          <div id="sub-page">
            <Outlet />
          </div>
        </>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/explore",
          element: loaded ? (
            <Explore scheduleList={scheduleList} loaded={loaded} />
          ) : null,
        },
        {
          path: "/",
          element: loaded ? (
            <Explore scheduleList={scheduleList} loaded={loaded} />
          ) : null,
        },
        {
          path: "/analytics",
          element: loaded ? <Analytics scheduleList={scheduleList} /> : null,
        },
      ],
    },
  ]);

  return (
    <div id="sub-root">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
