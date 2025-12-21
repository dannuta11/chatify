import { createBrowserRouter } from "react-router-dom";

import { Login } from "@features";
import { RootComponent } from "@miscellaneous";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
};

export const router = createBrowserRouter([
  {
    element: <RootComponent />,
    children: [
      {
        path: ROUTES.HOME,
        element: <div>Home page</div>,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
    ],
  },
]);
