import { notification } from "antd";

export const useAntdNotification = () => {
  const [, contextHolder] = notification.useNotification();

  return contextHolder;
};
