const { body, check, validationResult } = require("express-validator");
const User = require("../models").User;

const isEmailExist = (value) => {
  return User.findAll({
    where: {
      email: value,
    },
  }).then((user) => {
    if (user.length > 0) {
      return Promise.reject("E-mail already in use");
    }
  });
};

const isPhoneNumberExist = (value = "") => {
  return User.findAll({
    where: {
      phone_number: value,
    },
  }).then((user) => {
    if (user.length > 0) {
      return Promise.reject("Mobile number already in use");
    }
  });
};

const isIndonesianPhone = (value = "") => {
  return /(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/.test(
    value
  );
};

const userValidationRules = () => {
  return [
    body("first_name").exists(),
    body("last_name").exists(),
    check("phone_number")
      .exists().withMessage("Mobile number is required").bail()
      // .isMobilePhone().withMessage('Mobile number is invalid').bail()
      .custom(isIndonesianPhone).withMessage("Mobile number must use Indonesian number").bail()
      .custom(isPhoneNumberExist),
    check("email")
      .exists().withMessage("E-mail is required").bail()
      .isEmail().withMessage("E-mail is invalid").bail()
      .custom(isEmailExist),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
