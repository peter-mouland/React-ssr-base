import { expect, shallow, React } from '../../../../tests/support/test.helper';
import SignUpPage from './SignUpPage';

const baseProps = {};

describe('Sign Up Page', () => {
  it('should have an id of game', () => {
    const wrapper = shallow(<SignUpPage { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'sign-up-page');
  });
  //  unit testing goes here
});
