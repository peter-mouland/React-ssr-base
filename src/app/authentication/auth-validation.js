const validator = require('validator');

export const text = {
  signup: {
    errors: {
      email: 'Please provide a correct email address.',
      password: 'Password must have at least 8 characters.',
      name: 'Please provide your name.',
      message: 'Check the form for errors.'
    }
  },
  login: {
    errors: {
      email: 'Please provide your email address.',
      password: 'Please provide your password.',
      message: 'Check the form for errors.'
    }
  }
};

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
export function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = text.signup.errors.email;
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = text.signup.errors.password;
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = text.signup.errors.name;
  }

  if (!isFormValid) {
    message = text.signup.errors.message;
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
export function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = text.login.errors.email;
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = text.login.errors.password;
  }

  if (!isFormValid) {
    message = text.login.errors.message;
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

export function validateSignupResponse(err) {
  const res = {
    status: 200,
    body: {
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    }
  };
  if (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status = 409;
      res.body = {
        success: false,
        message: 'Check the form for errors.',
        errors: {
          email: 'This email is already taken.'
        }
      };
    } else {
      res.status = 400;
      res.body = {
        success: false,
        message: 'Could not process the form.'
      };
    }
  }
  return res;
}

export function validateLoginResponse(err, token, userData) {
  const res = {
    status: 200,
    body: {
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    }
  };
  if (err) {
    if (err.name === 'IncorrectCredentialsError') {
      res.status = 400;
      res.body = {
        success: false,
        message: err.message
      };
    } else {
      res.status = 400;
      res.body = {
        success: false,
        message: 'Could not process the form.'
      };
    }
  }
  return res;
}

