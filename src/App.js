import "./App.css";
import Sidebar from "./sidebar";

import ErrorPage from "./error-page";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./home/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <Sidebar />
          <div id="sub-page">
            <Outlet />
          </div>
        </>
      ),
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/notification", element: <h1>noti</h1> },
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
