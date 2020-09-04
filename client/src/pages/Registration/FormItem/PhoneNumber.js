import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";
import { stripNonPhoneCharacter } from "utils/sanitizer";

const PhoneNumberField = ({ loading }) => {
  return (
    <Form.Item
      name="phone_number"
      rules={[
        { required: true, message: "Please input your mobile phone" },
        {
          pattern: /[^a-zA-Z]/,
          message: "Mobile number can not alphabet",
        },
        {
          pattern: /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}?/,
          message: "Mobile number must use Indonesian number",
        },
        {
          max: 14,
          message: "Mobile number invalid"
        }
      ]}
      normalize={(value) => stripNonPhoneCharacter(value)}
    >
      <Input type="tel" placeholder="Mobile Phone" disabled={loading} />
    </Form.Item>
  );
};

PhoneNumberField.propTypes = {
  loading: PropTypes.bool,
};

export default PhoneNumberField;
