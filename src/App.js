import "./App.css";
import SideBar from "./SideBar";

import ErrorPage from "./error-page";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Explore from "./explore/Explore";
import Analytics from "./analytics/Analytics";

function App() {
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
        { path: "/explore", element: <Explore /> },
        { path: "/", element: <Explore /> },
        { path: "/analytics", element: <Analytics /> },
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
