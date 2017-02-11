import Chance from 'chance';

import { expect, shallow, React, sinon } from '../../../../../tests/support/test.helper';
import LoginPage from './LoginPage';
import LoginForm from '../../components/LoginForm/LoginForm';
import Auth from '../../auth-helper';

const chance = new Chance();
const baseProps = {};
const sandbox = sinon.sandbox.create();

const fakeEvent = {
  preventDefault: sandbox.stub()
};

describe('Login Page', () => {

  context('Auth login without errors', () => {

    beforeEach(()=>{
      sandbox.stub(Auth, 'login', function(user, cb){
        cb();
      });
    });

    afterEach(()=>{
      sandbox.restore();
    });

    it('should have an id of login-page', () => {
      const wrapper = shallow(<LoginPage { ...baseProps } />);
      expect(wrapper.at(0)).to.have.prop('id', 'login-page');
    });

    it('should prevent normal form submission', () => {
      const wrapper = shallow(<LoginPage { ...baseProps } />);
      const loginForm = wrapper.find(LoginForm);
      loginForm.props().onSubmit(fakeEvent);
      expect(fakeEvent.preventDefault).to.be.calledWith();
    });

    it('should set state ready to redirect to the home page once authorised', () => {
      const wrapper = shallow(<LoginPage { ...baseProps } />);
      const loginForm = wrapper.find(LoginForm);
      expect(loginForm.props().onSubmit).to.be.a('function');
      expect(wrapper.state().redirectToReferrer).to.equal(false);
      loginForm.props().onSubmit(fakeEvent);
      expect(wrapper.state().redirectToReferrer).to.equal('/');
    });

    it('should redirect to the "from" prop once authorised', () => {
      const from = chance.word();
      const props = { location: { state: { from }}};
      const wrapper = shallow(<LoginPage { ...props } />);
      const loginForm = wrapper.find(LoginForm);
      expect(loginForm.props().onSubmit).to.be.a('function');
      expect(wrapper.state().redirectToReferrer).to.equal(false);
      loginForm.props().onSubmit(fakeEvent);
      expect(wrapper.state().redirectToReferrer).to.equal(from);
    });
  });

  context('Auth login with errors', () => {

    const error = chance.word();

    beforeEach(()=>{
      sandbox.stub(Auth, 'login', function(user, cb){
        cb(error);
      });
    });

    it('should set errors if authorisation returns errors', () => {
      const from = chance.word();
      const props = { location: { state: { from }}};
      const wrapper = shallow(<LoginPage { ...props } />);
      const loginForm = wrapper.find(LoginForm);
      expect(loginForm.props().onSubmit).to.be.a('function');
      expect(wrapper.state().redirectToReferrer).to.equal(false);
      loginForm.props().onSubmit(fakeEvent);
      expect(wrapper.state().redirectToReferrer).to.equal(false);
      expect(wrapper.state().errors).to.equal(error);
    });
  });
});
