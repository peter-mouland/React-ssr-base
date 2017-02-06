import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Provider } from 'react-redux';
import matchPath from 'react-router-dom/matchPath'

import configureStore from '../../app/store/configure-store';
import { makeRoutes, routes } from '../../app/routes';

function getMatch(url) {
  return routes
    .find((route) => matchPath(url, route.path, { exact: true, strict: false }))
}

async function getContext(dispatch, req) {
  const needs = [];
  routes
    .filter((route) => route.component.needs)
    .map((route) => {
      const match = getMatch(req.url);
      if (match){
        route.component.needs.map((need) => needs.push(dispatch(need(match.params))))
      }
    });
  await Promise.all(needs);
}

class Markup  extends React.Component {
  render() {
    const { req,store } = this.props;
    return (
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}} >
          {makeRoutes()}
        </StaticRouter>
      </Provider>
    )
  }
}

function setRouterContext() {
  return async (ctx, next) => {
    const store = configureStore();
    const markup = renderToString(<Markup req={ ctx.request } store={store} />);
    await getContext(store.dispatch, ctx.request);
    const match = getMatch(ctx.request.url);
    ctx.status = match ? 200 : 404;
    ctx.initialState = store.getState();
    ctx.routerContext = markup;
    await next();
  };
}

export default setRouterContext;
