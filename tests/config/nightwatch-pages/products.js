// https://github.com/nightwatchjs/nightwatch/wiki/Page-Object-API
// http://nightwatchjs.org/guide#using-page-objects
import { findRoute } from '../../../src/app/routes';

module.exports = {

  url: function () {
    return findRoute('products').path;
  },

  elements: [{
    main: "#products"
  }],

  sections: {

    main: {

      selector: '#products',
      locateStrategy: 'css selector'

    }
  }
};
