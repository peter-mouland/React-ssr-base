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

export function sendXhr(formData, url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('post', url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    const response = xhr.response;
    // JSON.parse needed for ie11.
    const jsonResponse = (typeof response === 'string') ? JSON.parse(response) : response;
    if (xhr.status === 200) {
      cb({ authenticated: true, token: jsonResponse.token, message: jsonResponse.message });
    } else {
      const errors = buildErrors(jsonResponse);
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
    if (res.authenticated && res.token) { // prevent undefined getting saved
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

  static onChange() {}

  static authenticateUser(token, ctx) {
    if (ctx) {
      ctx.session.authorization = `Bearer ${token}`;
    }
    cookie.save('token', token, { path: '/' });
  }

  static isUserAuthenticated(ctx) {
    if (!this.getToken(ctx)) return false; // do this first to stop ie11 breaking
    try {
      return jwtDecode(this.getToken(ctx));
    } catch (e) {
      this.deauthenticateUser(ctx);
      return false;
    }
  }

  static deauthenticateUser(ctx) {
    if (ctx) {
      ctx.session.authorization = false;
    }
    cookie.remove('token', { path: '/' });
  }

  static getToken(ctx) {
    const authHeader = ctx && ctx.session && ctx.session.authorization;
    return authHeader
      ? authHeader.split(' ')[1]
      : cookie.load('token', { path: '/' });
  }

}

export default Auth;
