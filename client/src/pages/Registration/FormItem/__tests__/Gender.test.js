import React from "react";
import { render, screen, fireEvent, cleanup, } from "@testing-library/react";

import Gender from "../Gender";
import { FormWrapper } from "test/utils";

afterEach(cleanup)

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

test('should change value when select was clicked ', () => {
  const { container }= render(<Gender />, { wrapper: FormWrapper });
  const inputMale = screen.getByDisplayValue("male");
  const inputFemale = screen.getByDisplayValue("female");
  const [maleLabel, femaleLabel] = container.querySelectorAll(
    'label.ant-radio-wrapper'
  )
  
  fireEvent.click(inputMale)
  expect(maleLabel.firstElementChild.getAttribute('class')).toContain('ant-radio-checked')
  expect(femaleLabel.firstElementChild.getAttribute('class')).not.toContain('ant-radio-checked')
  
  fireEvent.click(inputFemale)
  expect(maleLabel.firstElementChild.getAttribute('class')).not.toContain('ant-radio-checked')
  expect(femaleLabel.firstElementChild.getAttribute('class')).toContain('ant-radio-checked')
})
