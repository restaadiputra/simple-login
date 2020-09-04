import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Success from "../Success";

const mockHistoryReplace = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}));

test("should render without error", () => {
  const { getByText } = render(<Success />);

  expect(getByText(/successfully logged in/i)).toBeInTheDocument();
  const button = getByText("Logout");
  fireEvent.click(button);
  expect(mockHistoryReplace).toHaveBeenCalledWith("/");
});
