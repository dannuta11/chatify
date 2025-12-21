import { notification } from "antd";

notification.config({
  placement: "topRight",
  maxCount: 1,
  duration: 1,
});

export const useAntdNotification = () => {
  const [, contextHolder] = notification.useNotification();

  return contextHolder;
};
