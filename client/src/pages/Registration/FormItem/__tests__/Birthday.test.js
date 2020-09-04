import React from "react";
import { render, screen } from "@testing-library/react";

import Birthday from "../Birthday";
import { FormWrapper } from "test/utils";

test("should have input without disable attribute", () => {
  render(<Birthday />, { wrapper: FormWrapper });
  const inputBirthdays = screen.queryAllByRole("combobox");
  expect(inputBirthdays.length).toBe(3);
  inputBirthdays.forEach((input) => {
    expect(input).not.toBeDisabled();
  });
});

test("should have input without disable attribute when props loading is false", () => {
  render(<Birthday loading={false} />, { wrapper: FormWrapper });
  const inputBirthdays = screen.queryAllByRole("combobox");
  expect(inputBirthdays.length).toBe(3);
  inputBirthdays.forEach((input) => {
    expect(input).not.toBeDisabled();
  });
});

test("should have input with disable attribute when props loading is true", () => {
  render(<Birthday loading={true} />, { wrapper: FormWrapper });
  const inputBirthdays = screen.queryAllByRole("combobox");
  expect(inputBirthdays.length).toBe(3);
  inputBirthdays.forEach((input) => {
    expect(input).toBeDisabled();
  });
});
