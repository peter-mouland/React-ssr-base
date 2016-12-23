import { Match, Miss, Redirect } from 'react-router';
import { sinon, React } from '../support/test.helper';
import supertest from 'supertest';
import * as routes from '../../src/app/routes';
import server from '../../src/server/server';

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
    <Match pattern="/" exactly component={AppRoute} />
    <Match pattern="/tests/" component={TestRoute} />
    <Match pattern="/another/" component={AnotherRoute} />
    <Match pattern="/broken-client-route/" component={BrokenClientRoute} />
    <Match pattern="/redirect/" render={RedirectRoute} />
    <Miss component={NotFound} />
  </AppRoute>
);

describe('Server', function () {
  const assets = {
    javascript: ["/app.js"],
    styles: ["/app.css"]
  };

  before(() => {
    sinon.stub(routes, 'makeRoutes').returns(ReactRoutes);
  });

  after(() => {
    routes.makeRoutes.restore();
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

  it('should render the ErrorPage when a react route throws', (done) => {
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
      .expect(/<link href="\/app.css/)
      .expect(/<script src="\/app.js/)
      .end(done);
  });

  it('Should gzip koaStatic assets', (done) => {
    supertest(server(assets).callback())
      .get('/app.js')
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

  it('should support react route redirects', (done) => {
    supertest(server(assets).callback())
      .get('/redirect/')
      .expect(301)
      .expect('location', '/tests/')
      .end(done);
  });

});
