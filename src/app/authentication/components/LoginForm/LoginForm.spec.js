import { expect, sinon, shallow, render, React } from '../../../../../tests/support/test.helper';
import Chance from 'chance';
import LoginForm from './LoginForm';

const chance = new Chance();
const sandbox = sinon.sandbox.create();

const fakeOnChange = sandbox.stub();
const fakeOnSubmit = sandbox.stub();
const defaultMockProps = {
  onChange: fakeOnChange,
  onSubmit: fakeOnSubmit,
  errors: { },
  successMessage: '',
  user: {},
  actions: { signUp: chance.word(), login: chance.word() }
};

describe('LoginForm', () => {
  it('has an email field that call onChange', () => {
    const fakeEvent = chance.word();
    const mockProps = Object.assign({}, defaultMockProps, { });
    const component = shallow(<LoginForm {...mockProps} />);
    component.find('input[type="email"]').simulate('change', fakeEvent);
    expect(fakeOnChange).to.be.calledWith(fakeEvent);
  });

  it('has an password field that call onChange', () => {
    const fakeEvent = chance.word();
    const mockProps = Object.assign({}, defaultMockProps, { });
    const component = shallow(<LoginForm {...mockProps} />);
    component.find('input[type="password"]').simulate('change', fakeEvent);
    expect(fakeOnChange).to.be.calledWith(fakeEvent);
  });

  it('has an action field with value login that call onChange', () => {
    const fakeEvent = chance.word();
    const mockProps = Object.assign({}, defaultMockProps, { });
    const fakeLogin = defaultMockProps.actions.login;
    const component = shallow(<LoginForm {...mockProps} />);
    component.find(`input[value="${fakeLogin}"]`).simulate('change', fakeEvent);
    expect(fakeOnChange).to.be.calledWith(fakeEvent);
  });

  it('has an action field with value signUp that call onChange', () => {
    const fakeEvent = chance.word();
    const mockProps = Object.assign({}, defaultMockProps, { });
    const fakeSignUp = defaultMockProps.actions.signUp;
    const component = shallow(<LoginForm {...mockProps} />);
    component.find(`input[value="${fakeSignUp}"]`).simulate('change', fakeEvent);
    expect(fakeOnChange).to.be.calledWith(fakeEvent);
  });

  it('call onSubmit', () => {
    const mockProps = Object.assign({}, defaultMockProps, { });
    const component = shallow(<LoginForm {...mockProps} />);
    component.simulate('submit');
    expect(fakeOnSubmit).to.be.calledWith();
  });
});
