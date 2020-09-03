import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const EmailField = ({ loading }) => {
  return (
    <Form.Item
      name="email"
      rules={[
        { required: true, message: "Please input your email" },
        { type: "email", message: "Email is invalid" },
      ]}
    >
      <Input type="email" placeholder="Email" disabled={loading} />
    </Form.Item>
  );
};

EmailField.propTypes = {
  loading: PropTypes.bool,
};

export default EmailField;
