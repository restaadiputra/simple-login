import React, { useState } from "react";
import { Button, Form, Typography, Alert } from "antd";
import { useHistory } from "react-router-dom";
import get from "lodash/get";

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
import MESSAGE from "constants/message";

const { Title } = Typography;

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
        const errors = get(err, "response.data.errors", undefined);

        if (errors) {
          setError(MESSAGE.FORM_NEED_ATTENTION);
          form.setFields(formatError(errors));
        } else {
          setError(MESSAGE.GENERAL_ERROR);
        }
      });
  };

  const onFinishFailed = () => {
    setError(MESSAGE.FORM_NEED_ATTENTION);
  };

  const failedAlert = error && (
    <div className={styles.alert}>
      <Alert message={error} type="error" showIcon closable />
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
              role="button"
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
