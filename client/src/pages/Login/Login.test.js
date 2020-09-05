import React from "react";
import { render, waitForElement, cleanup, wait, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "./Login";
import * as service from "services/auth";
import MESSAGE from 'constants/message'

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockLogin = jest.spyOn(service, "login");
const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test("should render success alert if user previously success in register", () => {
  render(<Login location={{ state: { login: true } }} />);
  expect(screen.getByText("Register success"));
});

test("should render error message when button was clicked with empty field", async () => {
  render(<Login />);
  userEvent.click(screen.getByRole("button"));
  await waitForElement(() => screen.getByText("Please input your email"));
});

test("should push history with /success if login is success", async () => {
  mockLogin.mockImplementation(() => Promise.resolve({ message: "Success" }));
  render(<Login />);

  userEvent.type(screen.getByPlaceholderText("Email"), "email@mail.com", {
    allAtOnce: true,
  });
  userEvent.click(screen.getByRole("button"));

  await wait(() => expect(mockLogin).toHaveBeenCalled());
  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith("/success");
});

test("should show error from server respond if rejected", async () => {
  const errMessage = "Email required"
  mockLogin.mockImplementation(() =>
    Promise.reject({
      response: {
        data: {
          message: errMessage,
        },
      },
    })
  );
  render(<Login />);

  userEvent.type(screen.getByPlaceholderText("Email"), "email@mail.com", {
    allAtOnce: true,
  });
  userEvent.click(screen.getByRole("button"));

  await wait(() => expect(mockLogin).toHaveBeenCalled());
  expect(mockLogin).toHaveBeenCalledTimes(1);
  expect(screen.getByText(errMessage)).toBeInTheDocument();
});

test("should show basic error if the error not from server", async () => {
  mockLogin.mockImplementation(() => Promise.reject({ message: "Error" }));
  render(<Login />);

  userEvent.type(screen.getByPlaceholderText("Email"), "email@mail.com", {
    allAtOnce: true,
  });
  userEvent.click(screen.getByRole("button"));

  await wait(() => expect(mockLogin).toHaveBeenCalled());
  expect(mockLogin).toHaveBeenCalledTimes(1);
  expect(screen.getByText(MESSAGE.GENERAL_ERROR)).toBeInTheDocument();
});
