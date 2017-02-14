// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../src/app/routes';


var commands = {
  login: function(email, password) {
    // this.api.pause(1000);
    return this.section.main.waitForElementVisible('@actionInput', 1000)
      .setValue('@emailInput', email)
      .setValue('@passwordInput', password)
      .click('@actionLoginInput')
      .click('@submitButton')
      // .waitForElementNotPresent('@submitButton', 1000);
  },
  signUp: function(email, password) {
    // this.api.pause(1000);
    return this.section.main.waitForElementVisible('@actionInput', 1000)
      .setValue('@emailInput', email)
      .setValue('@passwordInput', password)
      .click('@actionSignUpInput')
      .click('@submitButton')
      // .waitForElementNotPresent('@submitButton', 1000);
  }
};


module.exports = {

  url: function () {
    return findRoute('login').path;
  },

  commands: [commands],
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
        actionSignUpInput: 'input[value=signUp]',
      }]
    }
  }
};
