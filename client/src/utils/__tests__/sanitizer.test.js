import {
  stripNonPhoneCharacter,
  formatPhoneNumber,
  registerFormSanitizer,
  formatError,
  resetError,
} from "../sanitizer";

describe("stripNonPhoneCharacter function", () => {
  test("should throw an error if value is not a string", () => {
    expect(() => stripNonPhoneCharacter(123)).toThrowError(/value must be type of string/)
  });

  test('should remove all non numeric except "+" and space', () => {
    const test1 = "+62 81234958393";
    const test2 = "081-234 596";
    const test3 = "089 999 999 999-";
    const test4 = "123asdf123asdf";

    expect(stripNonPhoneCharacter(test1)).toBe("+62 81234958393");
    expect(stripNonPhoneCharacter(test2)).toBe("081234 596");
    expect(stripNonPhoneCharacter(test3)).toBe("089 999 999 999");
    expect(stripNonPhoneCharacter(test4)).toBe("123123");
  });
});

describe("formatPhoneNumber function", () => {
  test("should replace +62 or 62 with 0", () => {
    const test1 = "+62812345678";
    const test2 = "62812345678";
    const test3 = "0812345678";
    const test4 = "812345678";

    expect(formatPhoneNumber(test1)).toBe("0812345678");
    expect(formatPhoneNumber(test2)).toBe("0812345678");
    expect(formatPhoneNumber(test3)).toBe("0812345678");
    expect(formatPhoneNumber(test4)).toBe("0812345678");
  });

  test("should return undefined if value is undefined", () => {
    const test1 = undefined;

    expect(formatPhoneNumber()).toBeUndefined();
    expect(formatPhoneNumber(test1)).toBeUndefined();
  });

  test("should return empty string if value is null", () => {
    const test1 = null;

    expect(formatPhoneNumber(test1)).toBe("");
  });
});

describe("registerFormSanitizer function", () => {
  test("should return sanitize form value", () => {
    const formData1 = {
      phone_number: "+62812345678",
      first_name: "John",
      last_name: "Doe",
      year: 2020,
      month: 12,
      day: 1,
      gender: "male",
      email: "mail@mail.com",
    };

    const formData2 = {
      phone_number: "+62812345678",
      first_name: "John",
      last_name: "Doe",
      email: "mail@mail.com",
    };

    expect(registerFormSanitizer(formData1)).toStrictEqual({
      phone_number: "0812345678",
      first_name: "John",
      last_name: "Doe",
      date_of_birth: new Date("2020-12-1"),
      gender: "male",
      email: "mail@mail.com",
    });

    expect(registerFormSanitizer(formData2)).toStrictEqual({
      phone_number: "0812345678",
      first_name: "John",
      last_name: "Doe",
      date_of_birth: undefined,
      gender: undefined,
      email: "mail@mail.com",
    });
  });
});

describe("formatError", () => {
  test("should throw an error if value is not an array", () => {
    expect(() => formatError("test")).toThrowError(/value must be an array/)
  });

  test("should create an array of error", () => {
    const data = [
      {
        email: "required"
      },
      {
        phone_number: "must be valid"
      }
    ];

    expect(formatError(data)).toStrictEqual([
      {
        name: "email",
        errors: ["required"]
      },
      {
        name: "phone_number",
        errors: ["must be valid"]
      }
    ])
  });
});

describe("resetError", () => {
  test("should throw an error if value is not an object", () => {
    expect(() => resetError("test")).toThrowError(/value must be an object/)
  });

  test("should create an array of empty error", () => {
    const data = {
      email: "test",
      phone_number: "test"
    };

    expect(resetError(data)).toStrictEqual([
      {
        name: "email",
        errors: []
      },
      {
        name: "phone_number",
        errors: []
      }
    ])
  });
});
