import React from "react";
import {
  render,
  screen,
  waitForElement,
  wait,
  cleanup,
  getByText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Registration from "./Registration";
import * as service from "services/register";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockRegisterUser = jest.spyOn(service, "registerUser");
const mockHistoryPush = jest.fn();

const data = {
  phone_number: "08123456789",
  first_name: "john",
  last_name: "doe",
  month: undefined,
  day: undefined,
  year: undefined,
  gender: undefined,
  email: "mail@test.com",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test("should render error message when button was clicked with empty field", async () => {
  render(<Registration />);
  userEvent.click(screen.getByRole("button"));
  await waitForElement(() =>
    screen.getByText("Please input your mobile phone")
  );

  expect(
    screen.getByText("There are fields that require your attention")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Please input your mobile phone")
  ).toBeInTheDocument();
  expect(screen.getByText("Please input your first name")).toBeInTheDocument();
  expect(screen.getByText("Please input your last name")).toBeInTheDocument();
  expect(screen.getByText("Please input your email")).toBeInTheDocument();
});

test("should call register service with form value", async () => {
  mockRegisterUser.mockImplementation(() =>
    Promise.resolve({ message: "Success" })
  );

  render(<Registration />);

  userEvent.type(screen.getByPlaceholderText("Mobile Phone"), data.phone_number, {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText("First Name"), data.first_name, {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText("Last Name"), data.last_name, {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText("Email"), data.email, {
    allAtOnce: true,
  });

  // fireEvent.mouseDown(screen.getByTestId('month').firstElementChild)
  // fireEvent.click(screen.getByText('January'));

  // fireEvent.mouseDown(screen.getByTestId('date').firstElementChild)
  // fireEvent.click(screen.getByText('01'));

  // fireEvent.mouseDown(screen.getByTestId('year').firstElementChild)
  // fireEvent.click(screen.getByText('2000'));

  userEvent.click(screen.getByRole("button"));

  await wait(() => expect(mockRegisterUser).toHaveBeenCalled());
  expect(mockRegisterUser).toHaveBeenCalledWith(data);
  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith("/login", { login: true });
});

test('should display error from service response', async () => {
  mockRegisterUser.mockRejectedValueOnce({ 
    response: { 
      data: {
        errors: [
          {
            phone_number: "Mobile Phone already in used"
          }
        ]
      }
    }
  });

  render(<Registration />);

  userEvent.type(screen.getByPlaceholderText("Mobile Phone"), data.phone_number, {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText("First Name"), data.first_name, {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText("Last Name"), data.last_name, {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText("Email"), data.email, {
    allAtOnce: true,
  });

  userEvent.click(screen.getByRole("button"));

  await waitForElement(() => screen.getByText('Mobile Phone already in used'));
});

test('should display general error if it is not from service response', async () => {
  mockRegisterUser.mockRejectedValueOnce({ 
    message: "Error"
  });

  render(<Registration />);

  userEvent.type(screen.getByPlaceholderText("Mobile Phone"), data.phone_number, {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText("First Name"), data.first_name, {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText("Last Name"), data.last_name, {
    allAtOnce: true,
  });
  userEvent.type(screen.getByPlaceholderText("Email"), data.email, {
    allAtOnce: true,
  });

  userEvent.click(screen.getByRole("button"));

  await waitForElement(() => screen.getByText('Something went wrong'));
})
