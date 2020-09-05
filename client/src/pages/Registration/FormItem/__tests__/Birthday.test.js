import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
  cleanup,
} from "@testing-library/react";

import Birthday from "../Birthday";
import { FormWrapper } from "test/utils";

afterEach(cleanup);

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

test("should change value when select was clicked", async () => {
  const { debug, container } = render(<Birthday />, {
    wrapper: FormWrapper,
  });

  const monthSelect = container.querySelector(
    "[data-testid=month] > .ant-select-selector"
  );
  const dateSelect = container.querySelector(
    "[data-testid=date] > .ant-select-selector"
  );
  const yearSelect = container.querySelector(
    "[data-testid=year] > .ant-select-selector"
  );

  fireEvent.mouseDown(monthSelect);
  await waitForElement(() => screen.getByText("January"));
  fireEvent.click(document.querySelector(`[label="January"]`));
  await waitForElement(() => document.querySelector(`[title="January"]`));

  fireEvent.mouseDown(dateSelect);
  await waitForElement(() => document.querySelector(`[label="01"]`));
  fireEvent.click(document.querySelector(`[label="01"]`));
  await waitForElement(() => document.querySelector(`[title="01"]`));

  fireEvent.mouseDown(yearSelect);
  await waitForElement(() => document.querySelector(`[label="2010"]`));
  fireEvent.click(document.querySelector(`[label="2010"]`));
  await waitForElement(() => document.querySelector(`[title="2010"]`));
});

test("should show error date and year if only month was selected", async () => {
  const { container } = render(<Birthday />, {
    wrapper: FormWrapper,
  });

  const monthSelect = container.querySelector(
    "[data-testid=month] > .ant-select-selector"
  );

  fireEvent.mouseDown(monthSelect);
  await waitForElement(() => screen.getByText("January"));
  fireEvent.click(document.querySelector(`[label="January"]`));
  await waitForElement(() => document.querySelector(`[title="January"]`));

  fireEvent.click(screen.getByRole("button"));

  await waitForElement(() => screen.getByText("Enter Day"));
  await waitForElement(() => screen.getByText("Enter Year"));
  expect(screen.getByText("Enter Day")).toBeInTheDocument();
  expect(screen.getByText("Enter Year")).toBeInTheDocument();
});

test("should show error month and year if only date was selected", async () => {
  const { container } = render(<Birthday />, {
    wrapper: FormWrapper,
  });

  const dateSelect = container.querySelector(
    "[data-testid=date] > .ant-select-selector"
  );

  fireEvent.mouseDown(dateSelect);
  await waitForElement(() => screen.getByText("01"));
  fireEvent.click(document.querySelector(`[label="01"]`));
  await waitForElement(() => document.querySelector(`[title="01"]`));

  fireEvent.click(screen.getByRole("button"));

  await waitForElement(() => screen.getByText("Enter Month"));
  await waitForElement(() => screen.getByText("Enter Year"));
  expect(screen.getByText("Enter Month")).toBeInTheDocument();
  expect(screen.getByText("Enter Year")).toBeInTheDocument();
});

test("should show error month and date if only year was selected", async () => {
  const { container } = render(<Birthday />, {
    wrapper: FormWrapper,
  });

  const yearSelect = container.querySelector(
    "[data-testid=year] > .ant-select-selector"
  );

  fireEvent.mouseDown(yearSelect);
  await waitForElement(() => screen.getByText("2010"));
  fireEvent.click(document.querySelector(`[label="2010"]`));
  await waitForElement(() => document.querySelector(`[title="2010"]`));

  fireEvent.click(screen.getByRole("button"));

  await waitForElement(() => screen.getByText("Enter Month"));
  await waitForElement(() => screen.getByText("Enter Day"));
  expect(screen.getByText("Enter Month")).toBeInTheDocument();
  expect(screen.getByText("Enter Day")).toBeInTheDocument();
});
