import { React, mount, expect } from '../config/test.helper';
import Root, { Router } from '../../src/app/Root';
import Homepage from '../../src/app/containers/Homepage/Homepage';
import NotFound from '../../src/app/containers/NotFound/NotFound';
import ProductsPage from '../../src/app/containers/ProductsPage/ProductsPage';

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

  describe('products', () => {
    it('should render the Products page', () => {
      this.wrapper = mount(<Root location="/products/"/>);
      expect(this.wrapper.find(ProductsPage).length).to.equal(1);
      expect(this.wrapper.find('#products').length).to.equal(1);
    });
  });
});
