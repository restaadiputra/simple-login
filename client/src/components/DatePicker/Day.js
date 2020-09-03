import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

const getLabel = (value) => (value + 1 < 10 ? "0" : "") + value;

const generateDay = (maxDay) =>
  Array.from(new Array(maxDay), (_, index) => ({
    value: index + 1,
    label: getLabel(index + 1),
  }));

const generateOptions = (month, year) => {
  const leap = year % 4 === 0;
  switch (month) {
    case 2:
      return generateDay(leap ? 29 : 28);
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return generateDay(31);
    case 4:
    case 6:
    case 9:
    case 11:
      return generateDay(30);
    default:
      throw new Error("month is out of value");
  }
};

const Day = ({ month, year, ...props }) => {
  return (
    <Select
      options={generateOptions(month, year)}
      placeholder="Date"
      {...props}
    />
  );
};

Day.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
};

Day.defaultProps = {
  month: 1,
  year: 2000,
}

export default Day;
