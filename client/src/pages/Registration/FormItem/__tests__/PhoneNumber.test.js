import React from "react";
import { render, screen, waitForDomChange } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PhoneNumber from "../PhoneNumber";
import { FormWrapper } from "test/utils";

test("should have input without disable attribute", () => {
  render(<PhoneNumber />, { wrapper: FormWrapper });
  const inputPhoneNumber = screen.getByPlaceholderText("Mobile Phone");
  expect(inputPhoneNumber).not.toBeDisabled();
});

test("should have input without disable attribute when props loading is false", () => {
  render(<PhoneNumber loading={false} />, { wrapper: FormWrapper });
  const inputPhoneNumber = screen.getByPlaceholderText("Mobile Phone");
  expect(inputPhoneNumber).not.toBeDisabled();
});

test("should have input with disable attribute when props loading is true", () => {
  render(<PhoneNumber loading={true} />, { wrapper: FormWrapper });
  const inputPhoneNumber = screen.getByPlaceholderText("Mobile Phone");
  expect(inputPhoneNumber).toBeDisabled();
});

test("should show patterr error when input value is not an Indonesian phone number", async () => {
  const { container} = render(<PhoneNumber />, { wrapper: FormWrapper });

  const inputPhoneNumber = screen.getByPlaceholderText("Mobile Phone");
  userEvent.type(inputPhoneNumber, "999999", { allAtOnce: true });

  await waitForDomChange({ container });
  expect(screen.queryByText("Mobile number must use Indonesian number")).toBeInTheDocument();
});

test("show required error message when input value is not phone number", async () => {
  const { container} = render(<PhoneNumber />, { wrapper: FormWrapper });

  const inputPhoneNumber = screen.getByPlaceholderText("Mobile Phone");
  userEvent.type(inputPhoneNumber, "asdf", { allAtOnce: true });

  await waitForDomChange({ container });
  expect(screen.queryByText("Please input your mobile phone")).toBeInTheDocument();
});

test("show max len error message when input value is not phone number", async () => {
  const { container} = render(<PhoneNumber />, { wrapper: FormWrapper });

  const inputPhoneNumber = screen.getByPlaceholderText("Mobile Phone");
  userEvent.type(inputPhoneNumber, "081234567890123", { allAtOnce: true });

  await waitForDomChange({ container });
  expect(screen.queryByText("Mobile number invalid")).toBeInTheDocument();
});
