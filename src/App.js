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
    const appointmentMap = {};
    return await fetch(`${BACKEND_URL}/shop/${SHOP_ID}/`)
      .then((res) => res.json())
      .then(async (res) => {
        console.log("res", res);

        for (const ap of res.data.relationships.appointment_set.data) {
          await fetch(`${BACKEND_URL}/appointment/${ap.id}/`)
            .then((res) => res.json())
            .then(async (apData) => {
              const user = await fetch(
                `${BACKEND_URL}/user/${apData.data.relationships.user.data.id}/`
              )
                .then((res) => res.json())
                .then((data) => {
                  return data.data.attributes;
                });
              const apObj = {
                ...apData.data.attributes,
                user: user,
                id: ap.id,
              };

              const date = new Date(
                apData.data.attributes.date
              ).toLocaleDateString();

              if (apData.data.date in appointmentMap) {
                appointmentMap[date].push(apObj);
              } else {
                appointmentMap[date] = [apObj];
              }
            });
        }

        return appointmentMap;
      });
  }

  const [scheduleMap, setScheduleMap] = useState([]);

  useEffect(() => {
    loadSchedule().then((data) => {
      setLoaded(true);
      setScheduleMap(data);
    });
  }, []);

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
            <Explore scheduleMap={scheduleMap} loaded={loaded} />
          ) : null,
        },
        {
          path: "/",
          element: loaded ? (
            <Explore scheduleMap={scheduleMap} loaded={loaded} />
          ) : null,
        },
        {
          path: "/analytics",
          element: loaded ? <Analytics scheduleMap={scheduleMap} /> : null,
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
