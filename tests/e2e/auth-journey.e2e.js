import { findRoute } from '../../src/app/routes';

module.exports = {
  '@tags': ['smoke'],
  before(browser) {
    browser.pageLoaded(findRoute('homepage').path, 'body');
  },
  after(browser) {
    browser.end();
  },

  ['should not be able to see a the dashboard without logging in'](browser) {
    // browser
    //   .click('[href="/dashboard/"]')
    //   .pause(500)
    //   .expect.element('#login-page').to.be.present;
  },

  ['should  be able to log in, which would then go straight to the dashboard page'](browser) {
    // browser
    //   .click('[href="/dashboard/"]')
    //   .expect.element('#login-page').to.be.present;
  },
  ['should  be able to log out'](browser) {
    // browser
    //   .click('[href="/dashboard/"]')
    //   .expect.element('#login-page').to.be.present;
  },
  ['once logged out, going to the dashboard page asks for log in again'](browser) {
    // browser
    //   .click('[href="/dashboard/"]')
    //   .expect.element('#login-page').to.be.present;
  },

};
