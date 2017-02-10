const validator = require('validator');

export const text = {
  signupForm: {
    errors: {
      email: 'Please provide a correct email address.',
      password: 'Password must have at least 8 characters.',
      name: 'Please provide your name.',
      message: 'Check the form for errors.'
    }
  },
  signupResponse: {
    success: 'You have successfully signed up! Now you should be able to log in.',
    error400: 'Could not process the form.',
    errors: {
      message: 'Check the form for errors.',
      email: 'This email is already taken.'
    }
  },
  loginForm: {
    errors: {
      email: 'Please provide your email address.',
      password: 'Please provide your password.',
      message: 'Check the form for errors.'
    }
  },
  loginResponse: {
    success: 'You have successfully logged in!',
    error400: 'Could not process the form.'
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
    errors.email = text.signupForm.errors.email;
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = text.signupForm.errors.password;
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = text.signupForm.errors.name;
  }

  if (!isFormValid) {
    message = text.signupForm.errors.message;
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
    errors.email = text.loginForm.errors.email;
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = text.loginForm.errors.password;
  }

  if (!isFormValid) {
    message = text.loginForm.errors.message;
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
      message: text.signupResponse.success
    }
  };
  if (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status = 409;
      res.body = {
        success: false,
        message: text.signupResponse.errors.message,
        errors: {
          email: text.signupResponse.errors.email
        }
      };
    } else {
      res.status = 400;
      res.body = {
        success: false,
        message: text.signupResponse.error400
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
      message: text.loginResponse.success,
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
        message: text.loginResponse.error400
      };
    }
  }
  return res;
}

