import { findRoute } from '../../src/app/routes';

module.exports = {
  '@tags': ['staging', 'production'],
  before(browser) {
    browser.pageLoaded(findRoute('homepage').path, 'body');
  },
  after(browser) {
    browser.end();
  },

  ['homepage layout should include nav, footer and content blocks'](browser) {
    browser.expect.element('.layout.layout--main').to.be.present;
    browser.expect.element('.layout__nav').to.be.present;
    browser.expect.element('.layout__content').to.be.present;
    browser.expect.element('.layout__footer').to.be.present;
  },

  ['homepage can navigate to the orders page'](browser) {
    browser.safeClick('[href="/orders/"]');
    browser.expect.element('#orders').to.be.present;
  }
};
