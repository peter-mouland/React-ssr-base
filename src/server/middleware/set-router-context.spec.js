import cookie from 'react-cookie';
import Chance from 'chance';
import { Route } from 'react-router-dom';
import proxyquire from 'proxyquire';

import { expect, sinon, assert, React } from '../../../tests/config/test.helper';
import * as routes from '../../app/routes';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

let fakePlugToRequest;
let fakeSignUp;
let fakeMakeRoutes;
let fakeState = { [chance.word()]: chance.word() };
let fakeDispatch = sandbox.stub();
let fakeGetState = sandbox.stub().returns(fakeState);

const AppRoute = ({ children }) => <div><h2>fake App Route</h2>{children}</div>;
const ReactRoutes = (path = '/') => (
  <Route path={path} exact component={AppRoute} />
);

const setRouterContext = proxyquire('./set-router-context', {
  '../../app/store/configure-store': () => ( { dispatch: fakeDispatch, getState: fakeGetState })
});

describe('set-router-context', ()=>{
  let middleWare;
  let ctx;

  beforeEach(()=>{
    ctx = {
      request: {
        url: chance.word()
      },
      response: chance.word()
    };
    fakePlugToRequest = sandbox.stub(cookie, 'plugToRequest', ()=>{});
  });

  afterEach(()=>{
    sandbox.restore();
  });

  it('calls plugToRequest to ensure cookies are universal', () => {
    middleWare = setRouterContext();
    return middleWare(ctx, () => {
      expect(fakePlugToRequest).to.be.calledWith(ctx.request, ctx.response);
    })
      .catch(e => {
        assert(false, e.toString());
      });
  });

  it('sets ctx.markup based on the req.url', () => {
    fakeMakeRoutes = sandbox.stub(routes, 'makeRoutes').returns(ReactRoutes(ctx.request.url));
    middleWare = setRouterContext();
    return middleWare(ctx, () => {
      expect(ctx.markup).to.be.contain('fake App Route</h2>');
    })
      .catch(e => {
        assert(false, e.toString());
      });
  });

  it('sets ctx.status = 200 based on if the req.url is matched', () => {
    fakeMakeRoutes = sandbox.stub(routes, 'makeRoutes').returns(ReactRoutes(ctx.request.url));
    fakeSignUp = sandbox.stub(routes, 'getRoutesConfig').returns([{
      path: ctx.request.url,
      component: {}
    }]);
    middleWare = setRouterContext();
    return middleWare(ctx, () => {
      expect(ctx.status).to.be.equal(200);
    })
      .catch(e => {
        assert(false, e.toString());
      });
  });

  it('sets ctx.status = 404 based on if the req.url is not matched', () => {
    fakeMakeRoutes = sandbox.stub(routes, 'makeRoutes').returns(ReactRoutes());
    fakeSignUp = sandbox.stub(routes, 'getRoutesConfig').returns([{
      path: chance.word(),
      component: {}
    }]);
    middleWare = setRouterContext();
    return middleWare(ctx, () => {
      expect(ctx.status).to.be.equal(404);
    })
      .catch(e => {
        assert(false, e.toString());
      });
  });

  it('sets ctx.initialState based on fetched data', () => {
    const fakePromise = () => Promise.resolve(fakeState);
    fakeMakeRoutes = sandbox.stub(routes, 'makeRoutes').returns(ReactRoutes(ctx.request.url));
    fakeSignUp = sandbox.stub(routes, 'getRoutesConfig').returns([{
      path: ctx.request.url,
      component: {
        needs: [ () => fakePromise ]
      }
    }]);
    middleWare = setRouterContext();
    return middleWare(ctx, () => {
      expect(fakeDispatch).to.be.calledWith(fakePromise)
      expect(fakeGetState).to.be.calledWith()
      expect(ctx.initialState).to.be.deep.equal(fakeGetState());
    })
      .catch(e => {
        assert(false, e.toString());
      });
  });

});
