import React, { useState } from "react";
import { Button, Form, Input, Typography, Alert } from "antd";
import { useHistory } from "react-router-dom";
import get from "lodash/get";

import styles from "./styles.module.css";
import { login } from "services/auth";
import MESSAGE from "constants/message";

const { Title } = Typography;

const Login = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);
    login(values)
      .then(() => {
        setLoading(false);
        history.push("/success");
      })
      .catch((err) => {
        setLoading(false);
        const message = get(err, "response.data.message", undefined);

        if (message) {
          setError(message);
          return;
        } else {
          setError(MESSAGE.GENERAL_ERROR);
        }
      });
  };

  const successAlert = location?.state?.login && !error && (
    <div className={styles.alert}>
      <Alert message="Register success" type="success" showIcon closable />
    </div>
  );

  const failedAlert = error && (
    <div className={styles.alert}>
      <Alert message={error} type="error" showIcon closable />
    </div>
  );

  return (
    <>
      {successAlert}
      {failedAlert}
      <div className={styles.card}>
        <Title level={3}>Login</Title>
        <Form name="registration" onFinish={onFinish} form={form}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Email is invalid" },
            ]}
          >
            <Input type="email" placeholder="Email" disabled={loading} />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
              disabled={loading}
              loading={loading}
              role="button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
