import { expect, shallow, React } from '../../../../tests/config/test.helper';
import { WrappedComponent as OrdersPage } from './OrdersPage';

const baseProps = {};

describe('OrdersPage Container', () => {
  it('should have an id of orders', () => {
    const wrapper = shallow(<OrdersPage { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'orders');
  });
  //  unit testing goes here
});
