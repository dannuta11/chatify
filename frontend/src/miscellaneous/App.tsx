import { RouterProvider } from "react-router-dom";

import { router } from "@routes";
import { useAntdNotification } from "@hooks";

import "@css/reset.css";
import "@css/App.css";

export const App = () => {
  const contextHolder = useAntdNotification();

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
};
