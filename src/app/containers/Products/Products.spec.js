import { expect, shallow, React } from '../../../../tests/config/test.helper';
import { WrappedComponent as Products } from './Products';

const baseProps = {};

describe('Products Container', () => {
  it('should have an id of products', () => {
    const wrapper = shallow(<Products { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'products');
  });
  //  unit testing goes here
});
