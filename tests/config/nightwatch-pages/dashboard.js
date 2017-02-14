// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../src/app/routes';

module.exports = {

  url: function () {
    return findRoute('dashboard').path;
  },

  elements: [{
    main:"#dashboard-page"
  }],

  sections: {

    main: {

      selector: '#dashboard-page',
      locateStrategy: 'css selector'

    }
  }
};
