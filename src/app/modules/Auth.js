import localStorage from '../utils/local-storage';
import { validateLoginForm, validateSignupForm } from '../../server/auth/validate';

function buildErrors(response) {
  const errors = response.errors || {};
  errors.summary = response.message;
  return errors;
}

function sendXhr(formData, url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('post', url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      cb({ authenticated: true, token: xhr.response.token, message: xhr.response.message });
    } else {
      const errors = buildErrors(xhr.response);
      cb({ errors });
    }
  });
  xhr.send(formData);
}

function requestLogin(user, cb) {
  const validationResult = validateLoginForm(user);
  if (!validationResult.success) {
    const errors = buildErrors(validationResult);
    cb({ errors });
  } else {
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent(user.password);
    const formData = `email=${email}&password=${password}`;
    sendXhr(formData, '/auth/login', cb);
  }
}

function requestSignUp(user, cb) {
  const validationResult = validateSignupForm(user);
  if (!validationResult.success) {
    const errors = buildErrors(validationResult);
    cb({ errors });
  } else {
    const name = encodeURIComponent(user.name);
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent(user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;
    sendXhr(formData, '/auth/signup', cb);
  }
}

class Auth {

  static login(user, cb) {
    if (this.getToken()) {
      if (cb) cb();
      this.onChange(true);
      return;
    }
    requestLogin(user, (res) => {
      if (res.authenticated) {
        this.authenticateUser(res.token);
        if (cb) cb(false, { message: res.message });
        this.onChange(true);
      } else {
        if (cb) cb(res.errors);
        this.onChange(false);
      }
    });
  }


  static signUp(user, cb) {
    requestSignUp(user, (res) => {
      if (res.authenticated) {
        this.authenticateUser(res.token);
        if (cb) cb(false, { message: res.message });
        this.onChange(true);
      } else {
        if (cb) cb(res.errors);
        this.onChange(false);
      }
    });
  }

  static logout(cb) {
    this.deauthenticateUser();
    if (cb) cb();
    this.onChange(false);
  }

  static get(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        cb(false, { message: xhr.response.message });
      } else {
        const errors = xhr.response ? xhr.response.errors || {} : {};
        errors.summary = xhr.response ? xhr.response.message : xhr.statusText;
        cb(errors);
      }
    });
    xhr.send();
  }

  static onChange() {}

  /**
   * Authenticate a user. Save a token string in Local Storage
   * @param {string} token
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;
