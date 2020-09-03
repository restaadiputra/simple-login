import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const NameField = ({ loading }) => {
  return (
    <>
      <Form.Item
        name="first_name"
        rules={[{ required: true, message: "Please input your first name" }]}
      >
        <Input type="text" placeholder="First Name" disabled={loading} />
      </Form.Item>
      <Form.Item
        name="last_name"
        rules={[{ required: true, message: "Please input your last name" }]}
      >
        <Input type="text" placeholder="Last Name" disabled={loading} />
      </Form.Item>
    </>
  );
};

NameField.propTypes = {
  loading: PropTypes.bool,
};

export default NameField;
