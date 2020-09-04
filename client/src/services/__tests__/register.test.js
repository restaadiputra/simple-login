import api from "utils/api";
import MockAdapter from "axios-mock-adapter";

import { registerUser } from "../register";

const mock = new MockAdapter(api);

it("should send request", (done) => {
  const payload = {
    phone_number: "+62812345678",
    first_name: "John",
    last_name: "Doe",
    year: 2020,
    month: 12,
    day: 1,
    gender: "male",
    email: "mail@mail.com",
  };
  const data = {
    data: {
      phone_number: "0812345678",
      first_name: "John",
      last_name: "Doe",
      date_of_birth: new Date("2020-12-1"),
      gender: "male",
      email: "mail@mail.com",
    },
  };
  mock.onPost("/api/user").reply(200, data);

  registerUser(payload).then(({ data }) => {
    expect(data).toStrictEqual(data);
    done();
  });
});
