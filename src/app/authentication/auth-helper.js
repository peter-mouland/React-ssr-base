import cookie from 'react-cookie';
import debug from 'debug';
import jwtDecode from 'jwt-decode';

import { validateLoginForm, validateSignUpForm } from './auth-validation';

const log = debug('base:Auth');

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
  const validationResult = validateSignUpForm(user);
  if (!validationResult.success) {
    const errors = buildErrors(validationResult);
    cb({ errors });
  } else {
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent(user.password);
    const formData = `email=${email}&password=${password}`;
    sendXhr(formData, '/auth/signup', cb);
  }
}


class Auth {

  static responseCallback(res, cb) {
    if (res.authenticated) {
      this.authenticateUser(res.token);
      if (cb) cb(false, { message: res.message });
      this.onChange(true);
    } else {
      if (cb) cb(res.errors);
      this.onChange(false);
    }
  }

  static login(user, cb) {
    if (this.getToken()) {
      if (cb) cb();
      this.onChange(true);
      return;
    }
    requestLogin(user, (res) => this.responseCallback(res, cb));
  }

  static signUp(user, cb) {
    requestSignUp(user, (res) => this.responseCallback(res, cb));
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
    xhr.setRequestHeader('Authorization', `Bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        cb(false, { message: xhr.response.message });
      } else {
        const errors = xhr.response ? xhr.response.errors || {} : {};
        errors.summary = xhr.response ? xhr.response.message : xhr.statusText;
        errors.status = xhr.status;
        cb(errors);
      }
    });
    xhr.send();
  }

  static onChange() {}

  static authenticateUser(token, ctx) {
    if (ctx) {
      ctx.session.authorization = `Bearer ${token}`;
    }
    cookie.save('token', token, { path: '/' });
  }

  static isUserAuthenticated() {
    try {
      jwtDecode(this.getToken());
      return true;
    } catch (e) {
      this.deauthenticateUser();
      return false;
    }
  }

  static deauthenticateUser(ctx) {
    if (ctx) {
      ctx.session.authorization = false;
    }
    cookie.remove('token', { path: '/' });
  }

  static getToken() {
    return cookie.load('token', { path: '/' });
  }

}

export default Auth;
