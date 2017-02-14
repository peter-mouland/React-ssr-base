import { findRoute } from '../../src/app/routes';

let loginPage;
let pageLayout;
let homePage;
let dashboardPage;
let logoutPage;

module.exports = {
  '@tags': ['smoke'],
  before(browser) {
    browser.pageLoaded(findRoute('homepage').path, 'body');
    loginPage = browser.page.login();
    pageLayout = browser.page.layout();
    homePage = browser.page.homepage();
    dashboardPage = browser.page.dashboard();
    logoutPage = browser.page.logout();
  },

  after(browser) {
    browser.end();
  },

  ['should not be able to see a the dashboard without logging in'](browser) {
    const nav = pageLayout.section.nav;
    loginPage.expect.section('@main').not.to.be.present;
    nav.assert.visible('@dashboardLink');
    nav.click('@dashboardLink');
    loginPage.expect.section('@main').to.be.visible;
  },

  ['should not be able to log in with an unknown user'](browser) {
    const nav = pageLayout.section.nav;
    nav.click('@dashboardLink');
    loginPage.login('night.watch@ssr.com', 'nightwatch');
    loginPage.expect.section('@main').to.be.visible;
  },

  ['should be able to sign-up, which would then go straight to the dashboard page'](browser) {
    const nav = pageLayout.section.nav;
    nav.click('@dashboardLink');
    loginPage.signUp('night.watch@ssr.com', 'nightwatch');
    dashboardPage.waitForElementPresent('@main', 1000);
    dashboardPage.expect.section('@main').to.be.visible;
  },
  ['should  be able to log out'](browser) {
    const nav = pageLayout.section.nav;
    nav.click('@logoutLink');
    logoutPage.expect.section('@main').to.be.visible;
  },
  ['once logged out, going to the dashboard page asks for log in again'](browser) {
    const nav = pageLayout.section.nav;
    nav.click('@dashboardLink');
    loginPage.expect.section('@main').to.be.visible;
  },

  ['should not be able to sign-up with same details twice'](browser) {
    const nav = pageLayout.section.nav;
    nav.click('@dashboardLink');
    loginPage.signUp('night.watch@ssr.com', 'nightwatch');
    // confirm error message appears
    loginPage.expect.section('@main').to.be.visible;
  },
  ['can now log in as the previously signed up user'](browser) {
    const nav = pageLayout.section.nav;
    nav.click('@dashboardLink');
    loginPage.login('night.watch@ssr.com', 'nightwatch');
    dashboardPage.waitForElementPresent('@main', 1000);
    dashboardPage.expect.section('@main').to.be.visible;
  },
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
