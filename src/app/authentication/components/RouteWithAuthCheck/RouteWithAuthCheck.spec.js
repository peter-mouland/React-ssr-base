import { expect, sinon, mount, render, shallow, React } from '../../../../../tests/config/test.helper';
import Redirect from 'react-router-dom/Redirect';
import StaticRouter from 'react-router-dom/StaticRouter';

import RouteWithAuthCheck from './RouteWithAuthCheck';
import Auth from '../../auth-helper';

const sandbox = sinon.sandbox.create();

let fakeIsUserAuthenticated;

describe('RouteWithAuthCheck', () => {

  beforeEach(() => {

  });

  afterEach(() => {
    sandbox.restore();
  });

  it('checks user is authenticated if the router requires authentication', () => {
    fakeIsUserAuthenticated = sandbox.stub(Auth, 'isUserAuthenticated');
    render(<StaticRouter><RouteWithAuthCheck component={()=> <div /> } path="/" requiresAuthentication={ true } /></StaticRouter>);
    expect(fakeIsUserAuthenticated).to.be.calledWith();
  });

  it.skip('does a redirect if route requires authentication and user is not authenticated', () => {
    fakeIsUserAuthenticated = sandbox.stub(Auth, 'isUserAuthenticated').returns(false);
    const fakeComponent = () => <div />;
    const component = render(<StaticRouter><RouteWithAuthCheck path={'/'} requiresAuthentication={ true } component={fakeComponent}/></StaticRouter>);
    expect(component.find(Redirect).length).to.equal(1);
    expect(component.find(fakeComponent).length).to.equal(0);
  });

  it('renders a component if route does require authentication and user is authenticated', () => {
    fakeIsUserAuthenticated = sandbox.stub(Auth, 'isUserAuthenticated').returns(true);
    const fakeComponent = () => <div />;
    const component = mount(<StaticRouter><RouteWithAuthCheck path={'/'} requiresAuthentication={ true } component={fakeComponent} /></StaticRouter>);
    expect(component.find(fakeComponent).length).to.equal(1);
  });

  it('renders a component if route does not require authentication', () => {
    const fakeComponent = () => <div />;
    const component = mount(<StaticRouter><RouteWithAuthCheck path={'/'} requiresAuthentication={ false } component={fakeComponent} /></StaticRouter>);
    expect(component.find(fakeComponent).length).to.equal(1);
  });
});
