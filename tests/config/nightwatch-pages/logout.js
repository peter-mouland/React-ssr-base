// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../src/app/routes';

module.exports = {

  url: function () {
    return findRoute('logout').path;
  },

  sections: {

    main: {

      selector: '#logout-page',
      locateStrategy: 'css selector'

    }
  }
};
