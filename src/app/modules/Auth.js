import localStorage from '../utils/local-storage';

function sendXhr(formData, url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('post', url);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      cb({ authenticated: true, token: xhr.response.token, message: xhr.response.message });
    } else {
      const errors = xhr.response.errors ? xhr.response.errors : {};
      errors.summary = xhr.response.message;
      cb({ errors });
    }
  });
  xhr.send(formData);
}

function requestLogin(user, cb) {
  const email = encodeURIComponent(user.email);
  const password = encodeURIComponent(user.password);
  const formData = `email=${email}&password=${password}`;
  sendXhr(formData, '/auth/login', cb);
}

function requestSignUp(user, cb) {
  const name = encodeURIComponent(user.name);
  const email = encodeURIComponent(user.email);
  const password = encodeURIComponent(user.password);
  const formData = `name=${name}&email=${email}&password=${password}`;
  sendXhr(formData, '/auth/signup', cb);
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
