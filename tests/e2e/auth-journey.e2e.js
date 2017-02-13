import { findRoute } from '../../src/app/routes';

let loginPage;
let pageLayout;
let homePage;

module.exports = {
  '@tags': ['smoke'],
  before(browser) {
    browser.pageLoaded(findRoute('homepage').path, 'body');
    loginPage = browser.page.login();
    pageLayout = browser.page.layout();
    // homePage = browser.page.homepage();
  },
  after(browser) {
    browser.end();
  },

  ['should not be able to see a the dashboard without logging in'](browser) {
    const nav = pageLayout.section.nav;
    const main = loginPage.section.main;
    browser.saveScreenshot('tests/screenshots/a.png')
    loginPage.expect.section('@main').not.to.be.present;
    nav.assert.visible('@dashboardLink');
    nav.click('@dashboardLink');
    loginPage.expect.section('@main').to.be.visible;
  },

  ['should be able to log in, which would then go straight to the dashboard page'](browser) {
    const nav = pageLayout.section.nav;
    const main = loginPage.section.main;
    browser.saveScreenshot('tests/screenshots/b.png')
    nav.click('@dashboardLink');
    main.setValue('@emailInput', 'nightwatch');
    main.setValue('@passwordInput', 'nightwatch');
    main.click('@submitButton');
    browser.saveScreenshot('tests/screenshots/login.png')
    // homePage.expect.section('@main').to.be.visible;
  },
  // ['should  be able to log out'](browser) {
  //   browser
  //     .click('[href="/dashboard/"]')
  //     .expect.element('#login-page').to.be.present;
  // },
  // ['once logged out, going to the dashboard page asks for log in again'](browser) {
  //   browser
  //     .click('[href="/dashboard/"]')
  //     .expect.element('#login-page').to.be.present;
  // },
  ['the system isnt fooled by a fake token cookie'](browser){

    // browser.setCookie({
    //   name: "token",
    //   value: "test_value",
    //   path: "/",
    //   secure: false,
    //   httpOnly: false,
    //   // expiry: 1395002765 // (Optional) time in seconds since midnight, January 1, 1970 UTC
    // });
  }
};
