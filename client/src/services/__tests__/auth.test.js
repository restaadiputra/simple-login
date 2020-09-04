import api from "utils/api";
import MockAdapter from "axios-mock-adapter";

import { login } from "../auth";

const mock = new MockAdapter(api);

it("should send request", (done) => {
  const data = { data: { message: "success" } };
  mock.onPost("/api/auth").reply(200, data);

  login().then(({ data }) => {
    expect(data).toStrictEqual(data);
    done();
  });
});
