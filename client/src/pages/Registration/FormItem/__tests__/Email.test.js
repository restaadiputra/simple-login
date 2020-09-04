import React from "react";
import { render, screen, waitForDomChange } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Email from "../Email";
import { FormWrapper } from "test/utils";

test("should not show error when user input valid email", async () => {
  const { container } = render(<Email />, { wrapper: FormWrapper });
  const emailInput = screen.getByPlaceholderText("Email");
  userEvent.type(emailInput, "email@mail.com", {
    allAtOnce: true,
  });
  await waitForDomChange({ container });
  expect(screen.queryByText("Email is invalid")).toBeNull();
});

test("should not show error when user input valid email", async () => {
  const { container } = render(<Email />, { wrapper: FormWrapper });
  const emailInput = screen.getByPlaceholderText("Email");
  userEvent.type(emailInput, "email", {
    allAtOnce: true,
  });
  await waitForDomChange({ container });
  expect(screen.queryByText("Email is invalid")).toBeInTheDocument();
});
