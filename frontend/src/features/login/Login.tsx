import type { FormProps } from "antd";
import { Button, Flex, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";

import type { LoginBody } from "@types";
import { useLogin } from "@network";
import { ROUTES } from "@routes";

type FieldType = LoginBody;

export const Login = () => {
  const navigate = useNavigate();
  const { isPending, login } = useLogin();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await login(values);
    notification.success({
      title: "Login Successful",
      description: "You have been logged in successfully.",
    });
    setTimeout(() => {
      navigate(ROUTES.HOME);
    }, 1000);
  };

  return (
    <Flex vertical justify="center" align="center" className="min-h-screen">
      <Form
        layout="vertical"
        labelCol={{ span: 8 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "The input is not a valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
