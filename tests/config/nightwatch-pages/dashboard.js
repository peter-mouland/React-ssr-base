// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
const { findRoute } = require('../../../src/app/routes');

const commands = {
  thenDisplays: function(element) {
    return this.section.main
      .waitForElementPresent(element, 1000)
      .assert.visible(element);
  }
};

module.exports = {

  url: function () {
    return findRoute('dashboard').path;
  },

  commands: [commands],

  elements: [{
    main: "#dashboard-page"
  }],

  sections: {

    main: {

      selector: '#dashboard-page',
      locateStrategy: 'css selector',

    }
  }
};
