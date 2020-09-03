export const removeNonNumeric = (value = "") => {
  const useSymbol = value.slice(0, 1) === "+";

  return (useSymbol ? "+" : "") + value.replace(/\D+/g, "");
};

export const formatPhoneNumber = (value = "", useZero = true) => {
  if (value === undefined || value === null) {
    return "";
  }
  let msisdn = value.replace("+", "");
  msisdn = msisdn.replace(/\D+/g, "");

  if (msisdn.slice(0, 2) === "62") {
    msisdn = `${useZero ? 0 : ""}${msisdn.slice(2)}`;
  } else if (/^[1-9]/.test(msisdn.charAt(0))) {
    msisdn = `${useZero ? 0 : ""}${msisdn}`;
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

export const formatError = (errors) =>
  errors.map((err) => {
    const field = Object.keys(err)[0];
    return {
      name: field,
      errors: [err[field]],
    };
  });

export const resetError = (formFields) =>
  Object.keys(formFields).map((field) => ({
    name: field,
    errors: [],
  }))
