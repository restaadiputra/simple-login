import React from "react";
import { Form, Button } from "antd";

export const FormWrapper = ({ children }) => {
  return (
    <Form>
      {children}
      <Form.Item>
        <Button htmlType="submit" role="button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
