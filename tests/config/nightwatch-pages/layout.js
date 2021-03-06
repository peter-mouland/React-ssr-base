// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects

module.exports = {

  url: function () {
    return this.api.launchUrl;
  },

  sections: {
    nav: {
      selector: 'nav.layout__nav',
      locateStrategy: 'css selector',
      elements: {
        aboutLink: 'a[href="/about/"]',
        gameLink: 'a[href="/game/"]',
        dashboardLink: 'a[href="/dashboard/"]',
        loginLink: 'a[href="/login/"]',
        logoutLink: 'a[href="/logout/"]',
      },
    },
    main: {
      selector: 'main.layout__content',
      locateStrategy: 'css selector',
    },
    footer: {
      selector: 'footer.layout__footer',
      locateStrategy: 'css selector',
    },
  }
};
