import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import { useAntdNotification } from "@hooks";

const queryClient = new QueryClient();

export const RootComponent = () => {
  const contextHolder = useAntdNotification();

  return (
    <ConfigProvider>
      {contextHolder}
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ConfigProvider>
  );
};
