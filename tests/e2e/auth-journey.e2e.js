import Chance from 'chance';

import { findRoute } from '../../src/app/routes';

const chance = new Chance();
let fakeEmail;
let fakePassword;
let loginPage;
let pageLayout;
let homePage;
let dashboardPage;
let logoutPage;

module.exports = {
  '@tags': ['staging'],
  before(browser) {
    fakeEmail = `test-${chance.email()}`;
    fakePassword = `test-${chance.sentence()}`;
    loginPage = browser.page.login();
    pageLayout = browser.page.layout();
    homePage = browser.page.homepage();
    dashboardPage = browser.page.dashboard();
    logoutPage = browser.page.logout();
    browser
      .pageLoaded(findRoute('homepage').path, { selector : '#homepage' })
      .deleteCookies();
  },

  after(browser){
    browser
      .url(browser.globals.TARGET_PATH + '/api/nuke/' + fakeEmail)
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
    loginPage.login(fakeEmail, fakePassword);
    loginPage.expect.section('@main').to.be.visible;
    loginPage.thenDisplays('@error');
  },

  ['should be able to sign-up, which would then go straight to the dashboard page'](browser) {
    pageLayout.section.nav.click('@dashboardLink');
    loginPage.signUp(fakeEmail, fakePassword);
    dashboardPage.waitForElementPresent('@main', 1000);
    dashboardPage.expect.section('@main').to.be.visible;
  },
  ['should  be able to log out'](browser) {
    pageLayout.section.nav.click('@logoutLink');
    logoutPage.expect.section('@main').to.be.visible;
  },
  ['once logged out, going to the dashboard page asks for log in again'](browser) {
    pageLayout.section.nav.click('@dashboardLink');
    loginPage.expect.section('@main').to.be.visible;
  },

  ['should not be able to sign-up with same details twice'](browser) {
    pageLayout.section.nav.click('@dashboardLink');
    loginPage.signUp(fakeEmail, fakePassword);
    loginPage.expect.section('@main').to.be.visible;
    loginPage.thenDisplays('@error');
  },
  ['can now log in as the previously signed up user'](browser) {
    pageLayout.section.nav.click('@dashboardLink');
    loginPage.login(fakeEmail, fakePassword);
    dashboardPage.waitForElementPresent('@main', 1000);
    dashboardPage.expect.section('@main').to.be.visible;
  },
  // temp skip to enable circle ci
  ['the system isnt fooled by a fake token cookie'](browser){
    return browser.setCookie({
        name: "token",
        value: "test_value",
        path: "/",
        secure: false,
        httpOnly: false
      })
      .pageLoaded(findRoute('homepage').path, { selector : '#homepage' })
      .perform(()=>{
        pageLayout.section.nav.click('@dashboardLink');
      }).perform(()=>{
        loginPage.waitForElementPresent('@main', 1000);
      }).perform(()=>{
        loginPage.expect.section('@main').to.be.visible;
      })
  },

  // ['hitting url with incorrect params return error, not unautherised'](){
  //    http://localhost:3000/api/game/:gameType(people%7Cfilms)/:card1/:card2
  // }
};
