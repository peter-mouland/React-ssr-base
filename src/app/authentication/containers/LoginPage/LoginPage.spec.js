import { expect, shallow, React } from '../../../../../tests/support/test.helper';
import LoginPage from './LoginPage';

const baseProps = {};

describe('Login Page', () => {
  it('should have an id of game', () => {
    const wrapper = shallow(<LoginPage { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'login-page');
  });
  //  unit testing goes here
});
