import { RouterProvider } from "react-router-dom";

import { router } from "@routes";

import "@css/reset.css";
import "@css/App.css";

export const App = () => {
  return <RouterProvider router={router} />;
};
