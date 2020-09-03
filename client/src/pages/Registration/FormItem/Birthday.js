import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col } from "antd";
import { Month, Day, Year } from "components/DatePicker";

const BirthdayField = ({ loading }) => {
  return (
    <Row gutter={[16]}>
      <Col span={8}>
        <Form.Item
          name="month"
          dependencies={["day", "year"]}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value && (getFieldValue("day") || getFieldValue("year"))) {
                  return Promise.reject("Enter Month");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Month disabled={loading} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="day"
          dependencies={["month", "year"]}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value &&
                  (getFieldValue("month") || getFieldValue("year"))
                ) {
                  return Promise.reject("Enter Day");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Day disabled={loading} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="year"
          dependencies={["day", "month"]}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value &&
                  (getFieldValue("day") || getFieldValue("month"))
                ) {
                  return Promise.reject("Enter Year");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Year disabled={loading} />
        </Form.Item>
      </Col>
    </Row>
  );
};

BirthdayField.propTypes = {
  loading: PropTypes.bool,
};

export default BirthdayField;
