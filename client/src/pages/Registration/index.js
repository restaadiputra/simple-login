import React, { useState } from "react";
import { Button, Form, Radio, Typography, Alert } from "antd";
import { useHistory } from "react-router-dom";

import {
  BirthdayField,
  EmailField,
  GenderField,
  NameField,
  PhoneNumberField,
} from "./FormItem";
import styles from "./styles.module.css";

import { registerUser } from "services/register";
import { formatError, resetError } from "utils/sanitizer";

const { Title } = Typography;

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);
    setError(false);
    form.setFields(resetError(form.getFieldsValue()));

    registerUser(values)
      .then(() => {
        setLoading(false);
        history.push("/login", { login: true });
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        const { errors } = err.response.data;

        if (errors) {
          form.setFields(formatError(errors));
          return;
        }
      });
  };

  const onFinishFailed = () => {
    setError(true);
  };

  const failedAlert = error && (
    <div className={styles.alert}>
      <Alert
        message="There are fields that require your attention"
        type="error"
        showIcon
        closable
      />
    </div>
  );

  return (
    <>
      {failedAlert}
      <div className={styles.card}>
        <Title level={3}>Registration</Title>
        <Form
          name="registration"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <PhoneNumberField loading={loading} />
          <NameField loading={loading} />
          <BirthdayField loading={loading} />
          <GenderField loading={loading} />
          <EmailField loading={loading} />
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              block
              disabled={loading}
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Registration;
