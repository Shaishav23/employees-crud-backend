const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // username checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isLength(data.password, { min: 6, max: 40 })) {
    errors.password = "Password must be atleast 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
