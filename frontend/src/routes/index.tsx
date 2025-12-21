import { createBrowserRouter } from "react-router-dom";

import { Login } from "@features";
import { RootComponent } from "@miscellaneous";

export const router = createBrowserRouter([
  {
    element: <RootComponent />,
    children: [
      {
        path: "/",
        element: <div>Home page</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
