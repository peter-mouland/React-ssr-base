import { Route, Redirect, Switch } from 'react-router-dom';
import supertest from 'supertest';

import { sinon, React } from '../config/test.helper';
import * as routes from '../../src/app/routes';
import mapWebpackAssets from '../../src/server/utils/mapWebpackAssets';
import server from '../../src/server/server';
const webpackAssets = require('../../src/webpack-assets.json');

const AppRoute = ({ children }) => <div><h2>App</h2>{children}</div>;
const TestRoute = () => <div>Test Route</div>;
const AnotherRoute = () => <div>Another Route</div>;
const RedirectRoute = (props) => <Redirect to={{ pathname: '/tests/', state: { from: props.location } }} />;
const NotFound = () => <div>Not found!</div>;
const BrokenClientRoute = () => {
  throw new Error('new error!');
};
const ReactRoutes = (
  <AppRoute >
    <Switch>
      <Route path="/" exact component={AppRoute} />
      <Route path="/tests/" component={TestRoute} />
      <Route path="/another/" component={AnotherRoute} />
      <Route path="/broken-client-route/" component={BrokenClientRoute} />
      <Route path="/redirect/" render={RedirectRoute} />
      <Route component={NotFound} />
    </Switch>
  </AppRoute>
);
const assets = mapWebpackAssets(webpackAssets);

describe.only('Server', function () {
  before(() => {
    sinon.stub(routes, 'makeRoutes').returns(ReactRoutes);
    sinon.stub(routes, 'getRoutesConfig').returns([
      {
        exact: true,
        path: '/',
        component: AppRoute
      },
      {
        path: '/tests/',
        component: TestRoute
      },
      {
        path: '/redirect/',
        component: RedirectRoute
      }
    ]);
  });

  after(() => {
    routes.makeRoutes.restore();
    routes.getRoutesConfig.restore();
  });

  it('should render NotFound with 404 status when not found', (done) => {
    supertest(server(assets).callback())
      .get('/route-that-doesnt-exist/')
      .expect(404, /Not found/)
      .end(done);
  });

  it('should render the ErrorPage when a server route throws', (done) => {
    supertest(server(assets).callback())
      .get('/broken-client-route/')
      .expect(500, /Man down!/)
      .end(done);
  });

  it('Should render a html page', (done) => {
    supertest(server(assets).callback())
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<!doctype html>/)
      .expect(/<html lang="en"/)
      .expect(/<link href="\/app-/)
      .expect(/<script src="\/vendor-/)
      .expect(/<script src="\/app-/)
      .end(done);
  });

  it('Should gzip koaStatic assets', (done) => {
    supertest(server(assets).callback())
      .get(assets.javascript[0])
      .expect(200)
      .expect('Content-Encoding', 'gzip')
      .end(done);
  });

  it('should render react routes from `makeRoutes()`', (done) => {
    supertest(server(assets).callback())
      .get('/tests/')
      .expect(200)
      // can't test complete match because of generated data-reactids
      .expect(/App/)
      .expect(/Test Route/)
      .end(done);
  });

  it.skip('should support react route redirects', (done) => {
    supertest(server(assets).callback())
      .get('/redirect/')
      .expect(301)
      .expect('location', '/tests/')
      .end(done);
  });
});
