import React from 'react';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import debug from 'debug';

import { makeRoutes } from './routes';
import configureStore from './store/configure-store';
import { isBrowser } from './utils';

debug('base:Root');

// exported to be used in tests
export const Router = isBrowser ? BrowserRouter : StaticRouter;
const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router {...this.props} >
          {makeRoutes()}
        </Router>
      </Provider>
    );
  }
}
