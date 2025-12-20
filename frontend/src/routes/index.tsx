import { createBrowserRouter } from "react-router-dom";

import { RootComponent } from "../RootComponent";

export const router = createBrowserRouter([
  {
    element: <RootComponent />,
    children: [
      {
        path: "/",
        element: <div>Home page</div>,
      },
    ],
  },
]);
