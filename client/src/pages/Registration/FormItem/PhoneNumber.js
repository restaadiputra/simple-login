import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const PhoneNumberField = ({ loading }) => {
  return (
    <Form.Item
      name="phone_number"
      rules={[
        { required: true, message: "Please input your mobile phone" },
        {
          pattern: /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}?/,
          message: "Mobile number must use Indonesian number",
        },
      ]}
    >
      <Input type="tel" placeholder="Mobile Phone" disabled={loading} />
    </Form.Item>
  );
};

PhoneNumberField.propTypes = {
  loading: PropTypes.bool,
};

export default PhoneNumberField;
