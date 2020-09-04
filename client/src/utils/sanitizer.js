export const stripNonPhoneCharacter = (value = "") => {
  if (typeof value !== "string") {
    throw new Error("value must be type of string");
  }

  return value.replace(/[^0-9+\s]/g, "");
};

export const formatPhoneNumber = (value = "") => {
  if (value === null) {
    return "";
  }
  let msisdn = value.replace("+", "");
  msisdn = msisdn.replace(/\D+/g, "");

  if (msisdn.slice(0, 2) === "62") {
    msisdn = `0${msisdn.slice(2)}`;
  } else if (/^[1-9]/.test(msisdn.charAt(0))) {
    msisdn = `0${msisdn}`;
  }

  return msisdn === "" ? undefined : msisdn;
};

export const registerFormSanitizer = (value) => {
  return {
    phone_number: formatPhoneNumber(value.phone_number),
    first_name: value.first_name,
    last_name: value.last_name,
    date_of_birth:
      value.year &&
      value.month &&
      value.day &&
      new Date(`${value.year}-${value.month}-${value.day}`),
    gender: value.gender,
    email: value.email,
  };
};

export const formatError = (errors) => {
  if (!Array.isArray(errors)) {
    throw Error("value must be an array");
  }

  return errors.map((err) => {
    const field = Object.keys(err)[0];
    return {
      name: field,
      errors: [err[field]],
    };
  });
};

export const resetError = (formFields) => {
  if (typeof formFields !== "object") {
    throw Error("value must be an object");
  }

  return Object.keys(formFields).map((field) => ({
    name: field,
    errors: [],
  }));
};
