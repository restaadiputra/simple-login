import React from "react";
import { render, screen, fireEvent, waitForElement } from "@testing-library/react";
import Day from "../Day";

test("should render without error", () => {
  const { rerender } = render(<Day />);
  rerender(<Day month={1} />);
  rerender(<Day month={2} year={2000} />);
  rerender(<Day month={2} year={2001} />);
  rerender(<Day month={4} />);
  rerender(<Day month={13} />)
});
