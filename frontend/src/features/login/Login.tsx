import type { FormProps } from "antd";
import { Button, Flex, Form, Input } from "antd";

import type { LoginBody } from "@types/index";
import { useLogin } from "@network/index";

type FieldType = LoginBody;

export const Login = () => {
  const { isPending, login } = useLogin();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    await login(values);
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
