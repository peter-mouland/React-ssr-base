import cookie from 'react-cookie';
import debug from 'debug';

import { validateLoginForm, validateSignupForm } from '../../server/auth/validate';

const log = debug('lego:Auth');

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
    xhr.setRequestHeader('Authorization', `Bearer ${Auth.getToken()}`);
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

  static authenticateUser(token) {
    log('authenticateUser', token);
    cookie.save('token', token);
  }

  static isUserAuthenticated() {
    log('isUserAuthenticated', cookie.load('token'));
    return !!cookie.load('token');
  }

  static deauthenticateUser() {
    cookie.remove('token');
  }

  static getToken() {
    return cookie.load('token');
  }

}

export default Auth;
