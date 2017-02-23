import { React, mount, expect } from '../config/test.helper';
import Root, { Router } from '../../src/app/Root';
import Homepage from '../../src/app/containers/Homepage/Homepage';
import NotFound from '../../src/app/containers/NotFound/NotFound';
import OrdersPage from '../../src/app/containers/OrdersPage/OrdersPage';

describe('Client Render', function () {
  afterEach(() => {
    this.wrapper.unmount();
  });

  it('Should render the Homepage', () => {
    this.wrapper = mount(<Root location="/"/>);
    expect(this.wrapper.find(Homepage).length).to.equal(1);
  });

  describe('404', () => {
    it('should render the 404 route', () => {
      this.wrapper = mount(<Root location="/not-found/"/>);
      expect(this.wrapper.find(NotFound).length).to.equal(1);
      expect(this.wrapper.find('#not-found').length).to.equal(1);
    });
  });

  describe('orders', () => {
    it('should render the Orders page', () => {
      this.wrapper = mount(<Root location="/orders/"/>);
      expect(this.wrapper.find(OrdersPage).length).to.equal(1);
      expect(this.wrapper.find('#orders').length).to.equal(1);
    });
  });
});
