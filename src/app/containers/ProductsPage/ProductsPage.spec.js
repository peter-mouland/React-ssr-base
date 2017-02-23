import { expect, shallow, React } from '../../../../tests/config/test.helper';
import { WrappedComponent as ProductsPage } from './ProductsPage';

const baseProps = {};

describe('Products Container', () => {
  it('should have an id of products', () => {
    const wrapper = shallow(<ProductsPage { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'products');
  });
  //  unit testing goes here
});
