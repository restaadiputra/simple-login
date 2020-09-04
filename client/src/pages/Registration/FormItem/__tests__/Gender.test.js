import React from "react";
import { render, screen } from "@testing-library/react";

import Gender from "../Gender";
import { FormWrapper } from "test/utils";

test("should have input without disable attribute", () => {
  render(<Gender />, { wrapper: FormWrapper });
  const inputMale = screen.getByDisplayValue("male");
  const inputFemale = screen.getByDisplayValue("female");

  expect(inputMale).not.toBeDisabled();
  expect(inputFemale).not.toBeDisabled();
});

test("should have input without disable attribute when props loading is false", () => {
  render(<Gender loading={false} />, { wrapper: FormWrapper });
  const inputMale = screen.getByDisplayValue("male");
  const inputFemale = screen.getByDisplayValue("female");

  expect(inputMale).not.toBeDisabled();
  expect(inputFemale).not.toBeDisabled();
});

test("should have input with disable attribute when props loading is true", () => {
  render(<Gender loading={true} />, { wrapper: FormWrapper });
  const inputMale = screen.getByDisplayValue("male");
  const inputFemale = screen.getByDisplayValue("female");

  expect(inputMale).toBeDisabled();
  expect(inputFemale).toBeDisabled();
});
