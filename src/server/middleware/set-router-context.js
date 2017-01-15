import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { Provider } from 'react-redux';
import { matchRoutesToLocation } from 'react-router-addons-routes';

import configureStore from '../../app/store/configure-store';
import { makeRoutes, routes } from '../../app/routes';

const createMarkup = (req, context, store) => renderToString(
  <Provider store={store}>
    <ServerRouter location={req.url} context={context} >
      {makeRoutes()}
    </ServerRouter>
  </Provider>
);

async function getContext(dispatch, req) {
  const { matchedRoutes, params } = matchRoutesToLocation(routes, { pathname: req.url });
  const needs = [];
  matchedRoutes.filter((route) => route.component.needs)
    .map((route) => route.component.needs.forEach((need) => needs.push(need)));
  await Promise.all(needs.map((need) => dispatch(need(params))));
}

function setRouterContext() {
  return async (ctx, next) => {
    const store = configureStore();
    const context = createServerRenderContext();
    const markup = createMarkup(ctx.request, context, store);
    const result = context.getResult();
    if (result.redirect) {
      ctx.status = 301;
      ctx.redirect(result.redirect.pathname + result.redirect.search);
    } else {
      await getContext(store.dispatch, ctx.request);
      ctx.status = result.missed ? 404 : 200;
      ctx.initialState = store.getState();
      ctx.routerContext = (result.missed)
            ? createMarkup(ctx.request, context, store)
            : markup;
    }
    await next();
  };
}

export default setRouterContext;
