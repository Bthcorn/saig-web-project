import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvide";
import { ProtectedUserRoute } from "./ProtectedUserRoute";
import { ProtectedAdminRoute } from "./ProtectedAdminRoute";
import Dashboard from "@/pages/admin/DashBoard";
import BoardGame from "@/pages/admin/BoardGame";
import Customers from "@/pages/admin/Customers";
import Orders from "@/pages/admin/Orders";
import Rooms from "@/pages/admin/Rooms";
import Category from "@/pages/admin/Category";
import Home from "@/pages/user/Home";
import Game from "@/pages/user/Game";
import Booking from "@/pages/user/Booking";
import History from "@/pages/user/History";
import Room from "@/pages/user/Room";
import User from "@/pages/user/User";
import { Sign } from "crypto";
import Login from "@/pages/Login";
// import { ProtectedRoute } from "./ProtectedRoute";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  // const routesForPublic = [
  //   {
  //     path: "/service",
  //     element: <div>Service Page</div>,
  //   },
  //   {
  //     path: "/about-us",
  //     element: <div>About Us</div>,
  //   },
  // ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedUserRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "admin",
          element: <ProtectedAdminRoute />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
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
            {
              path: "category",
              element: <Category />,
            },
          ],
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/boardgame",
          element: <Game />,
        },
        {
          path: "/booking",
          element: <Booking />,
        },
        {
          path: "/room",
          element: <Room />,
        },
        {
          path: "/history",
          element: <History />,
        },
        {
          path: "/profile",
          element: <User />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    // {
    //   path: "/",
    //   element: <div>Home Page</div>,
    // },
    {
      path: "/",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    // ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
