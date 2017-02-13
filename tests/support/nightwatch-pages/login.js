// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../src/app/routes';

module.exports = {

  url: function () {
    return findRoute('login').path;
  },

  sections: {

    main: {

      selector: '#login-page',
      locateStrategy: 'css selector',

      elements: [{
        submitButton: 'button[type=submit]',
        emailInput: 'input[type=email]',
        passwordInput: 'input[type=password]',
        actionInput: 'input[name=action]',
        actionLoginInput: 'input[value=login]',
        actionSignUpInput: 'input[value=sign-up]',
      }]
    }
  }
};
