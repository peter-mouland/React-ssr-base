import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Provider } from 'react-redux';
import cookie from 'react-cookie';
import matchPath from 'react-router-dom/matchPath';

import configureStore from '../../app/store/configure-store';
import { makeRoutes, getRoutesConfig } from '../../app/routes';

function getMatch(routesArray, url) {
  return routesArray
    .find((route) => matchPath(url, route.path, { exact: true, strict: false }));
}

async function getRouteData(routesArray, url, dispatch) {
  const needs = [];
  routesArray
    .filter((route) => route.component.needs)
    .forEach((route) => {
      const match = matchPath(url, route.path, { exact: true, strict: false });
      if (match) {
        route.component.needs.forEach((need) => {
          const result = need(match.params);
          needs.push(dispatch(result));
        });
      }
    });
  await Promise.all(needs);
}

class Markup extends React.Component {
  render() {
    const { req, store } = this.props;
    return (
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}} >
          {makeRoutes()}
        </StaticRouter>
      </Provider>
    );
  }
}

function setRouterContext() {
  const routesArray = getRoutesConfig();
  return async (ctx, next) => {
    const store = configureStore();
    cookie.plugToRequest(ctx.request, ctx.response); // essential for universal cookies
    await getRouteData(routesArray, ctx.request.url, store.dispatch);
    const markup = renderToString(<Markup req={ ctx.request } store={store} />);
    const match = getMatch(routesArray, ctx.request.url);
    ctx.status = match ? 200 : 404;
    ctx.initialState = store.getState();
    ctx.markup = markup;
    await next();
  };
}

export default setRouterContext;
