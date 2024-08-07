import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/Login";
import Home from "./pages/user/Home";
import DashBoard from "./pages/admin/DashBoard";
import BoardGame from "./pages/admin/BoardGame";
import Customers from "./pages/admin/Customers";
import Orders from "./pages/admin/Orders";
import Rooms from "./pages/admin/Rooms";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/admin",
    // add middleware to check if user is admin
    children: [
      {
        path: "dashboard",
        element: <DashBoard />,
      },
      {
        path: "boardgame",
        element: <BoardGame />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
