import { createBrowserRouter } from "react-router-dom";

import { RootComponent } from "../routes/RootComponent";

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
