import { expect, shallow, React } from '../../../../tests/config/test.helper';
import { WrappedComponent as Players } from './Players';

const baseProps = {};

describe('Players Container', () => {
  it('should have an id of Players', () => {
    const wrapper = shallow(<Players { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'players');
  });
  //  unit testing goes here
});
