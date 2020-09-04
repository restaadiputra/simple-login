import React from "react";
import { render, screen } from "@testing-library/react";
import Name from "../Name";
import { FormWrapper } from "test/utils";

test("should have input without disable attribute", () => {
  render(<Name />, { wrapper: FormWrapper });
  const inputFirstName = screen.getByPlaceholderText("First Name");
  const inputLastName = screen.getByPlaceholderText("Last Name");

  expect(inputFirstName).not.toBeDisabled();
  expect(inputLastName).not.toBeDisabled();
});

test("should have input without disable attribute when props loading is false", () => {
  render(<Name loading={false} />, { wrapper: FormWrapper });
  const inputFirstName = screen.getByPlaceholderText("First Name");
  const inputLastName = screen.getByPlaceholderText("Last Name");

  expect(inputFirstName).not.toBeDisabled();
  expect(inputLastName).not.toBeDisabled();
});

test("should have input with disable attribute when props loading is true", () => {
  render(<Name loading={true} />, { wrapper: FormWrapper });
  const inputFirstName = screen.getByPlaceholderText("First Name");
  const inputLastName = screen.getByPlaceholderText("Last Name");

  expect(inputFirstName).toBeDisabled();
  expect(inputLastName).toBeDisabled();
});
