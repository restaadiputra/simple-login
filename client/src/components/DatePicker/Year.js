import React from "react";
import { Select } from "antd";

const generateYear = (year) =>
  Array.from(new Array(100), (_, index) => ({
    value: year - index,
    label: "" + year - index,
  }));

const Year = (props) => {
  const year = new Date().getFullYear();
  return (
    <Select
      options={generateYear(year)}
      placeholder="Year"
      {...props}
      data-testid="year"
    />
  );
};

export default Year;
