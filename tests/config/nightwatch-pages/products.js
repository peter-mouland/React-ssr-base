// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../src/app/routes';

module.exports = {

  url: function () {
    return findRoute('orders').path;
  },

  elements: [{
    main: "#orders"
  }],

  sections: {

    main: {

      selector: '#orders',
      locateStrategy: 'css selector'

    }
  }
};
