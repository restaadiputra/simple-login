import React from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "antd";

const GenderField = ({ loading }) => {
  return (
    <Form.Item name="gender">
      <Radio.Group disabled={loading}>
        <Radio value={"male"} data-testid="gender-male">Male</Radio>
        <Radio value={"female"} data-testid="gender-female">Female</Radio>
      </Radio.Group>
    </Form.Item>
  );
};

GenderField.propTypes = {
  loading: PropTypes.bool,
};

export default GenderField;
